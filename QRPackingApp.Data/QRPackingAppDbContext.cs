using Microsoft.EntityFrameworkCore;
using QRPackingApp.Model;
namespace QRPackingApp.Data;

public class QRPackingAppDbContext : DbContext
{
    public QRPackingAppDbContext(DbContextOptions<QRPackingAppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Video> Videos => Set<Video>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Thiết lập ràng buộc khóa ngoại
        modelBuilder.Entity<Video>()
            .HasOne(v => v.Product)
            .WithMany(p => p.Videos)
            .HasForeignKey(v => v.ProductId);

        modelBuilder.Entity<Video>()
            .HasOne(v => v.User)
            .WithMany(u => u.Videos)
            .HasForeignKey(v => v.UserId);
    }
}
