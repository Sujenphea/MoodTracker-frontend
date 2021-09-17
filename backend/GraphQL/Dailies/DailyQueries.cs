using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using finalMoodTracker.Data;
using finalMoodTracker.Extensions;
using finalMoodTracker.GraphQL.DataLoader;
using finalMoodTracker.Models;
using HotChocolate;
using HotChocolate.Types;

namespace finalMoodTracker.GraphQL.Dailies
{
    [ExtendObjectType(name: "Query")]
    public class DailyQueries
    {
        [UseAppDbContext]
        public IEnumerable<Daily> GetDailies([ScopedService] AppDbContext context)
        {
            //context.Data­base.EnsureCreated();
            

            return context.Dailies;
        }

        [UseAppDbContext]
        public Task<Daily[]> GetDailiesByUserId(string id, DailiesByUserIdDataLoader dataLoader, [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            return dataLoader.LoadAsync(id, cancellationToken);
        }
    }
}
