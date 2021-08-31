using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using MoodTracker.Data;
using MoodTracker.Models;
using MoodTracker.GraphQL;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MoodTracker.GraphQL.DailyGraph
{
    public class DailyType : ObjectType<Daily>
    {
        protected override void Configure(IObjectTypeDescriptor<Daily> descriptor)
        {
            descriptor.Field(s => s.Id).Type<NonNullType<IdType>>();
            descriptor.Field(s => s.Summary).Type<NonNullType<StringType>>();
            descriptor.Field(s => s.DateCreated).Type<NonNullType<StringType>>();

            descriptor
                .Field(s => s.User)
                .ResolveWith<Resolvers>(r => r.GetUser(default!, default!, default))
                .UseDbContext<AppDbContext>()
                .Type<NonNullType<UserType>>();
        }

        private class Resolvers
        {
            public async Task<User> GetUser(Daily daily, [ScopedService] AppDbContext context,
                CancellationToken cancellationToken)
            {
                return await context.Users.FindAsync(new object[] { daily.UserId }, cancellationToken);
            }
        }
    }
}
