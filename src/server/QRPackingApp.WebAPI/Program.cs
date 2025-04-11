using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using QRPackingApp.Business;
using QRPackingApp.Data;
using QRPackingApp.Data.DataSeeding;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddHttpContextAccessor(); // Register HttpContextAccessor
builder.Services.AddBusinessServices(); // Register business services
builder.Services.AddRepositoryServices(); // Register repository services
builder.Services.AddControllers(); // Adds default controller services
builder.Services.AddEndpointsApiExplorer(); // Required for minimal APIs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
{
    {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type=ReferenceType.SecurityScheme,
                Id="Bearer"
            }
        },
        new string[]{}
    }
});
}); // Adds Swagger generator

// Register DbContext
builder.Services.AddDbContext<QRPackingAppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("AppDbConnectionString"));
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(option =>
{
    var key = Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"] ?? throw new Exception("No secret key founf"));
    option.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});




var app = builder.Build();
app.UseStaticFiles();
app.UseAuthentication();
app.UseCors("AllowAll");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    //Seed data
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<QRPackingAppDbContext>();
    var userJsonPath = Path.Combine(app.Environment.WebRootPath, "data", "User.json");
    var videoJsonPath = Path.Combine(app.Environment.WebRootPath, "data", "Video.json");
    var productJsonPath = Path.Combine(app.Environment.WebRootPath, "data", "Product.json");

    // Ensure the directory exists
    Directory.CreateDirectory(Path.Combine(app.Environment.WebRootPath, "data"));
    // Attempt to seed the database
    try
    {
        DbInitializer.Seed(context, userJsonPath, videoJsonPath, productJsonPath);
        Console.WriteLine("Database seeded successfully.");

    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error seeding database: {ex.Message}");
    }
    app.UseSwagger(); // Enables Swagger middleware
    app.UseSwaggerUI(); // Enables Swagger UI
}
app.MapControllers(); // Maps controller routes
app.UseHttpsRedirection();


await app.RunAsync();