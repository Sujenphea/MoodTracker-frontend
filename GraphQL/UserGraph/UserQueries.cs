using System;
using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using MoodTracker.Data;
using MoodTracker.Models;
using MoodTracker.Extensions;

namespace MoodTracker.GraphQL
{
    [ExtendObjectType(name: "Query")]
    public class UserQueries
    {
        [UseAppDbContext]
        [UsePaging]
        public IQueryable<User> GetUsers([ScopedService] AppDbContext context)
        {
            return context.Users;
        }

        [UseAppDbContext]
        public User GetUser(int id, [ScopedService] AppDbContext context)
        {
            return context.Users.Find(id);
        }
    }
}
