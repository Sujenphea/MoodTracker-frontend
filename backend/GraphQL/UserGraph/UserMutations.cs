using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using MoodTracker.Models;
using MoodTracker.Data;
using MoodTracker.Extensions;
using Octokit;
using HotChocolate.AspNetCore;
using User = MoodTracker.Models.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Collections.Generic;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using HotChocolate.AspNetCore.Authorization;
using System.Linq;

namespace MoodTracker.GraphQL.UserGraph
{
    [ExtendObjectType(name: "Mutation")]
    public class UserMutations
    {
        [UseAppDbContext]
        [Authorize]
        public async Task<User> EditSelfAsync(EditSelfInput input, ClaimsPrincipal claimsPrincipal,
        [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var userIdStr = claimsPrincipal.Claims.First(c => c.Type == "userId").Value;
            var user = await context.Users.FindAsync(int.Parse(userIdStr), cancellationToken);

            user.Name = input.Name ?? user.Name;

            await context.SaveChangesAsync(cancellationToken);

            return user;
        }

        [UseAppDbContext]
        public async Task<LoginPayload> LoginAsync(LoginInput input, [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var client = new GitHubClient(new ProductHeaderValue("MSA-Yearbook"));

            var request = new OauthTokenRequest(Startup.Configuration["Github:ClientId"], Startup.Configuration["Github:ClientSecret"], input.Code);
            var tokenInfo = await client.Oauth.CreateAccessToken(request);

            if (tokenInfo.AccessToken == null)
            {
                throw new GraphQLRequestException(ErrorBuilder.New()
                    .SetMessage("Bad code")
                    .SetCode("AUTH_NOT_AUTHENTICATED")
                    .Build());
            }

            client.Credentials = new Credentials(tokenInfo.AccessToken);
            var userClient = await client.User.Current();
            var user = await context.Users.FirstOrDefaultAsync(s => s.GitHub == userClient.Login, cancellationToken);

            if (user == null)
            {
                user = new User
                {
                    Name = userClient.Name ?? userClient.Login,
                    GitHub = userClient.Login,
                };

                context.Users.Add(user);
                await context.SaveChangesAsync(cancellationToken);
            }

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Startup.Configuration["JWT:Secret"]));
            var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>{
                new Claim("userId", user.Id.ToString()),
            };

            var jwtToken = new JwtSecurityToken(
                "MSA-Yearbook",
                "MSA-Student",
                claims,
                expires: DateTime.Now.AddDays(90),
                signingCredentials: credentials);

            string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            return new LoginPayload(user, token);
        }
    }
}
