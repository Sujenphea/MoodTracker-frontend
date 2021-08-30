using System;
using MoodTracker.Models;

namespace MoodTracker.GraphQL.UserGraph
{
    public record LoginPayload(
        User user,
        string jwt);
}
