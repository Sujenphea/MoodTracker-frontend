using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using MoodTracker.Data;
using MoodTracker.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using MoodTracker.GraphQL.DailyGraph;

namespace MoodTracker.GraphQL
{
    public class UserType : ObjectType<User>
    {
        protected override void Configure(IObjectTypeDescriptor<User> descriptor)
        {
            descriptor.Field(s => s.Id).Type<NonNullType<IdType>>();
            descriptor.Field(s => s.Name).Type<NonNullType<StringType>>();
            descriptor.Field(s => s.GitHub).Type<NonNullType<StringType>>();

            descriptor
                .Field(s => s.Dailies)
                .ResolveWith<Resolvers>(r => r.GetDailies(default!, default!, default))
                .UseDbContext<AppDbContext>()
                .Type<NonNullType<ListType<NonNullType<DailyType>>>>();
        }

        private class Resolvers
        {
            public async Task<IEnumerable<Daily>> GetDailies(User user, [ScopedService] AppDbContext context,
                CancellationToken cancellationToken)
            {
                return await context.Dailies.Where(c => c.UserId == user.Id).ToArrayAsync(cancellationToken);
            }
        }
    }
}
