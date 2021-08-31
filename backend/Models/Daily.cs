using System;
using System.ComponentModel.DataAnnotations;

namespace MoodTracker.Models
{
    public class Daily
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Summary { get; set; } = null!;

        [Required]
        public int UserId { get; set; }

        public User User { get; set; } = null!;

        public string? DateCreated { get; set; }
    }
}
