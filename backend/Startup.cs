using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using MoodTracker.Data;
using MoodTracker.GraphQL;
using MoodTracker.GraphQL.DailyGraph;
using MoodTracker.GraphQL.DataLoader;
using MoodTracker.GraphQL.UserGraph;

namespace MoodTracker
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

            services.AddPooledDbContextFactory<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddAuthorization();
            services
            .AddGraphQLServer()
            .AddAuthorization()
            .AddQueryType(d => d.Name("Query"))
                .AddTypeExtension<DailyQueries>()
                .AddTypeExtension<UserQueries>()
            .AddMutationType(d => d.Name("Mutation"))
                .AddTypeExtension<DailyMutations>()
                .AddTypeExtension<UserMutations>()
            .AddType<DailyType>()
            .AddType<UserType>()
            .AddDataLoader<UserByIdDataLoader>()
            .AddDataLoader<DailiesByUserIdDataLoader>()
            .AddDataLoader<DailyByIdDataLoader>();
            

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
            //app.UseStaticFiles();
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
