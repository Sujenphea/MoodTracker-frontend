﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.Azure.Cosmos;
using Microsoft.EntityFrameworkCore;
using finalMoodTracker.Data;
using finalMoodTracker.Extensions;
using finalMoodTracker.Models;
using User = finalMoodTracker.Models.User;
using HotChocolate.AspNetCore.Authorization;
using System.Security.Claims;

namespace finalMoodTracker.GraphQL.Users
{
    [ExtendObjectType(name: "Query")]
    public class UserQueries
    {
        [UseAppDbContext]
        public Microsoft.EntityFrameworkCore.DbSet<User> GetUsers([ScopedService] AppDbContext context)
        {
            //context.Data­base.EnsureCreated();
            foreach (var u in context.Users)
            {
                Console.WriteLine($"user: {u.Name}");
            };

            return context.Users;
        }

        [UseAppDbContext]
        [Authorize]
        public User GetSelf(ClaimsPrincipal claimsPrincipal, [ScopedService] AppDbContext context)
        {
            var userIdStr = claimsPrincipal.Claims.First(c => c.Type == "userId").Value;

            return context.Users.Find(userIdStr);
        }
    }
}



//var sqlQueryText = "SELECT * FROM c";
//QueryDefinition queryDefinition = new QueryDefinition(sqlQueryText);
//FeedIterator<User> queryResultSetIterator = context.container.GetItemQueryIterator<User>(queryDefinition);

//List<User> families = new List<User>();

//while (queryResultSetIterator.HasMoreResults)
//{
//    FeedResponse<User> currentResultSet = await queryResultSetIterator.ReadNextAsync();
//    foreach (User family in currentResultSet)
//    {
//        families.Add(family);
//    }
//}

//return families;