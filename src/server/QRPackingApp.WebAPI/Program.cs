using Microsoft.EntityFrameworkCore;
using QRPackingApp.Data;
using QRPackingApp.Data.DataSeeding;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

// Register DbContext
builder.Services.AddDbContext<QRPackingAppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("AppDbConnectionString"));
});


var app = builder.Build();

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
}

app.UseHttpsRedirection();


await app.RunAsync();