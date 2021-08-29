using System;
using MoodTracker.Models;

namespace MoodTracker.GraphQL.DailyGraph
{
    public record AddDailyInput
    (
        string Summary
    );
}
