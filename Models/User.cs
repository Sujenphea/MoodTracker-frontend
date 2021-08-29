using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MoodTracker.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? GitHub { get; set; }

        public ICollection<Daily> Dailies { get; set; } = new List<Daily>();

        public static implicit operator Octokit.User(User v)
        {
            throw new NotImplementedException();
        }
    }
}
