using System;
using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using MoodTracker.Data;
using MoodTracker.Models;
using MoodTracker.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using MoodTracker.GraphQL.DataLoader;
using System.Threading;

namespace MoodTracker.GraphQL.DailyGraph
{
    [ExtendObjectType(name: "Query")]
    public class DailyQueries
    {
        [UseAppDbContext]
        [UsePaging]
        public IQueryable<Daily> GetDailies([ScopedService] AppDbContext context)
        {
            return context.Dailies.OrderByDescending(s => s.DateCreated.Substring(6, 10)).ThenByDescending(s => s.DateCreated.Substring(3,5)).ThenByDescending(s => s.DateCreated.Substring(0,2));
        }

        public Task<Daily[]> GetDailiesByUserIdAsync(int id, DailiesByUserIdDataLoader dataLoader, CancellationToken cancellationToken)
        {
            return dataLoader.LoadAsync(id, cancellationToken);
        }

        public Task<Daily> GetDailyAsync(int id, DailyByIdDataLoader dataLoader, CancellationToken cancellationToken)
        {
            return dataLoader.LoadAsync(id, cancellationToken);
        }
    }
}
