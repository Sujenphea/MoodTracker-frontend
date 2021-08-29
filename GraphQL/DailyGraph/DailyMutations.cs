using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using MoodTracker.Models;
using MoodTracker.Data;
using MoodTracker.Extensions;

namespace MoodTracker.GraphQL.DailyGraph
{
    [ExtendObjectType(name: "Mutation")]
    public class DailyMutations
    {
        [UseAppDbContext]
        public async Task<Daily> AddDailyAsync(AddDailyInput input,
        [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            Console.WriteLine("--------adddaily---------");
            var daily = new Daily
            {
                Summary = input.Summary,
                UserId = input.UserId,
            };

            context.Dailies.Add(daily);
            await context.SaveChangesAsync(cancellationToken);

            return daily;
        }

        [UseAppDbContext]
        public async Task<Daily> EditDailyAsync(EditDailyInput input,
                [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var daily= await context.Dailies.FindAsync(input.Id);

            daily.Summary = input.Summary ?? daily.Summary;

            await context.SaveChangesAsync(cancellationToken);

            return daily;
        }
    }
}
