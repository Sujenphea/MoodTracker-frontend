using System;
using MoodTracker.Models;

namespace MoodTracker.GraphQL.DailyGraph
{
    public record EditDailyInput
    (
        int Id,
        string? Summary,
        int? UserId,
        User? User
    );
}
