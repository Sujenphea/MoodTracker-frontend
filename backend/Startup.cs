using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using finalMoodTracker.GraphQL.Users;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using finalMoodTracker.Data;
using finalMoodTracker.GraphQL.Dailies;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using finalMoodTracker.GraphQL.DataLoader;

namespace finalMoodTracker
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; private set; } = default!;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));

            services.AddControllers();

            var connectionString = "AccountEndpoint=https://moodtracker.documents.azure.com:443/;AccountKey=7bQ6dhl6Te9y35yOVjQQnYT6BN62UTZSeOTGuqRBYsonjtpQPCDuh1CboKw3j1qG7TbNnIyFAacZ48kZAatYuw==;";
            services.AddPooledDbContextFactory<AppDbContext>(options => options.UseCosmos(connectionString, "moodtracker"));

            services.AddAuthorization();

            services
                .AddGraphQLServer()
                .AddAuthorization()
                .AddQueryType(d => d.Name("Query"))
                    .AddTypeExtension<UserQueries>()
                    .AddTypeExtension<DailyQueries>()
                .AddMutationType(d => d.Name("Mutation"))
                    .AddTypeExtension<UserMutations>()
                    .AddTypeExtension<DailyMutations>()
                .AddType<UserType>()
                .AddType<DailyType>()
                .AddDataLoader<DailiesByUserIdDataLoader>()
                ;


            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters =
                        new TokenValidationParameters
                        {
                            ValidIssuer = "MSA-Yearbook",
                            ValidAudience = "MSA-Student",
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = signingKey
                        };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();
            app.UseCors("MyPolicy");

            app.UseRouting();

            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGraphQL();
                endpoints.MapControllers();
            });
        }
    }
}
