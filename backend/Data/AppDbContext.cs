using System;
using Microsoft.EntityFrameworkCore;
using MoodTracker.Models;

namespace MoodTracker.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions options): base(options)
        {}

        public DbSet<Daily> Dailies { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Daily>()
            //    //.HasKey(d => d.Id)
            //    .HasOne(d => d.User)
            //    .WithMany(u => u.Dailies)
            //    .HasForeignKey(d => d.UserId);
            modelBuilder.Entity<User>()
                .HasMany(u => u.Dailies)
                .WithOne(d => d.User)
                .HasForeignKey(u => u.UserId);
        }
    }
}
