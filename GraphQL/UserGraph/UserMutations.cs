using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using MoodTracker.Models;
using MoodTracker.Data;
using MoodTracker.Extensions;

namespace MoodTracker.GraphQL.UserGraph
{
    [ExtendObjectType(name: "Mutation")]
    public class UserMutations
    {
        [UseAppDbContext]
        public async Task<User> AddUserAsync(AddUserInput input, [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var user = new User {
                Name = input.Name,
                GitHub = input.GitHub
            };

            context.Users.Add(user);
            await context.SaveChangesAsync(cancellationToken);

            return user;
        }
    }
}
