using System;
using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using MoodTracker.Data;
using MoodTracker.Models;
using MoodTracker.Extensions;

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

        [UseAppDbContext]
        [UsePaging]
        public IQueryable<Daily> GetDailiesByUserId(int id, [ScopedService] AppDbContext context)
        {
            return context.Dailies.Where(s => s.UserId == id).OrderByDescending(s => s.DateCreated.Substring(6, 10)).ThenByDescending(s => s.DateCreated.Substring(3, 5)).ThenByDescending(s => s.DateCreated.Substring(0, 2));
        }

        [UseAppDbContext]
        public Daily GetDaily(int id, [ScopedService] AppDbContext context)
        {
            return context.Dailies.Find(id);
        }
    }
}
