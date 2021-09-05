using System;
using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using MoodTracker.Data;
using MoodTracker.Models;
using MoodTracker.Extensions;
using HotChocolate.AspNetCore.Authorization;
using System.Security.Claims;
using System.Threading;
using MoodTracker.GraphQL.DataLoader;
using System.Threading.Tasks;

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

        public Task<User> GetUserAsync(int id, UserByIdDataLoader dataLoader, CancellationToken cancellationToken)
        {
            return dataLoader.LoadAsync(id, cancellationToken);
        }

        [UseAppDbContext]
        [Authorize]
        public User GetSelf(ClaimsPrincipal claimsPrincipal, [ScopedService] AppDbContext context)
        {
            var userIdStr = claimsPrincipal.Claims.First(c => c.Type == "userId").Value;

            return context.Users.Find(int.Parse(userIdStr));
        }
    }
}
