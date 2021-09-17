using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.Azure.Cosmos;
using finalMoodTracker.Data;
using finalMoodTracker.Extensions;
using finalMoodTracker.Models;
using User = finalMoodTracker.Models.User;
using HotChocolate.AspNetCore.Authorization;
using System.Security.Claims;
using System.Threading;
using HotChocolate.AspNetCore;

namespace finalMoodTracker.GraphQL.Dailies
{
    // have to be async
    // https://www.thereformedprogrammer.net/an-in-depth-study-of-cosmos-db-and-ef-core-3-0-database-provider/
    [ExtendObjectType(name: "Mutation")]
    public class DailyMutations
    {
        [UseAppDbContext]
        //[Authorize]
        public async Task<Daily> AddDaily(AddDailyInput input, ClaimsPrincipal claimsPrincipal,
            [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var userId = claimsPrincipal.Claims.First(c => c.Type == "userId").Value;
            // unique id otherwise will take the first item
            var u = new Daily
            {
                Id = Guid.NewGuid().ToString(),
                Description = input.description,
                UserId = userId,
                //DateCreated = DateTime.Now.ToString("dd.MM.yyyy")
                DateCreated = DateTime.Now.ToString("02.12.2020")
            };

            //await context.AddAsync(u);
            await context.Dailies.AddAsync(u);
            await context.SaveChangesAsync();

            return u;
        }

        [UseAppDbContext]
        //[Authorize]
        public async Task<Daily> EditDaily(EditDailyInput input, ClaimsPrincipal claimsPrincipal,
                [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var userId = claimsPrincipal.Claims.First(c => c.Type == "userId").Value;
            var daily = await context.Dailies.FindAsync(input.id);

            if (daily.UserId != userId)
            {
                throw new GraphQLRequestException(ErrorBuilder.New()
                    .SetMessage("Not owned by user")
                    .SetCode("AUTH_NOT_AUTHORIZED")
                    .Build());
            }

            daily.Description = input.description ?? daily.Description;

            //await context.AddAsync(u);
            //await context.Dailies.Save;
            await context.SaveChangesAsync();

            return daily;
        }
    }

    public record AddDailyInput(string description);
    public record EditDailyInput(string id, string? description, string? userId);
}
