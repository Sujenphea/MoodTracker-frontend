using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using GreenDonut;
using HotChocolate.DataLoader;
using Microsoft.EntityFrameworkCore;
using MoodTracker.Data;
using MoodTracker.Models;

namespace MoodTracker.GraphQL.DataLoader
{
    public class DailiesByUserIdDataLoader: GroupedDataLoader<int, Daily>
    {
        private readonly IDbContextFactory<AppDbContext> _dbContextFactory;

        public DailiesByUserIdDataLoader(IBatchScheduler batchScheduler, IDbContextFactory<AppDbContext> dbContextFactory)
        : base(batchScheduler)
        {
            _dbContextFactory = dbContextFactory ??
                throw new ArgumentNullException(nameof(dbContextFactory));
        }

        protected override async Task<ILookup<int, Daily>> LoadGroupedBatchAsync(IReadOnlyList<int> keys, CancellationToken cancellationToken)
        {
            await using AppDbContext dbContext = _dbContextFactory.CreateDbContext();

            var x = await dbContext.Dailies.OrderByDescending(s => s.DateCreated.Substring(6, 10)).ThenByDescending(s => s.DateCreated.Substring(3, 5)).ThenByDescending(s => s.DateCreated.Substring(0, 2)).ToListAsync();

            return x.ToLookup(x => x.UserId);
        }
    }
}
