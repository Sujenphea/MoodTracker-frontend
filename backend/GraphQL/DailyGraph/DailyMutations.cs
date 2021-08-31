using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using MoodTracker.Models;
using MoodTracker.Data;
using MoodTracker.Extensions;
using HotChocolate.AspNetCore.Authorization;
using System.Security.Claims;
using System.Linq;
using HotChocolate.AspNetCore;

namespace MoodTracker.GraphQL.DailyGraph
{
    [ExtendObjectType(name: "Mutation")]
    public class DailyMutations
    {
        [UseAppDbContext]
        [Authorize]
        public async Task<Daily> AddDailyAsync(AddDailyInput input,
        ClaimsPrincipal claimsPrincipal, [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var userIdStr = claimsPrincipal.Claims.First(c => c.Type == "userId").Value;
            var daily = new Daily
            {
                Summary = input.Summary,
                UserId = int.Parse(userIdStr),
                DateCreated = DateTime.Now.ToString("dd.MM.yyyy")
            };

            context.Dailies.Add(daily);
            await context.SaveChangesAsync(cancellationToken);

            return daily;
        }

        [UseAppDbContext]
        [Authorize]
        public async Task<Daily> EditDailyAsync(EditDailyInput input, ClaimsPrincipal claimsPrincipal,
                [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var userIdStr = claimsPrincipal.Claims.First(c => c.Type == "userId").Value;
            var daily = await context.Dailies.FindAsync(input.Id);

            if (daily.UserId != int.Parse(userIdStr))
            {
                throw new GraphQLRequestException(ErrorBuilder.New()
                    .SetMessage("Not owned by user")
                    .SetCode("AUTH_NOT_AUTHORIZED")
                    .Build());
            }

            daily.Summary = input.Summary ?? daily.Summary;

            await context.SaveChangesAsync(cancellationToken);

            return daily;
        }
    }
}
