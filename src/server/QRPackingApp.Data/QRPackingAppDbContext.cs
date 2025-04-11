using Microsoft.EntityFrameworkCore;
using QRPackingApp.Model;

namespace QRPackingApp.Data
{
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

        // Override SaveChanges để tự động chuyển DateTime sang UTC
        public override int SaveChanges()
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is User || e.Entity is Product || e.Entity is Video)
                .ToList();

            foreach (var entry in entries)
            {
                foreach (var property in entry.Properties)
                {
                    // Kiểm tra nếu là kiểu DateTime và có giá trị, chuyển đổi về UTC
                    if (property.CurrentValue is DateTime dateTimeValue && property.Metadata.ClrType == typeof(DateTime))
                    {
                        if (dateTimeValue.Kind == DateTimeKind.Unspecified)
                        {
                            // Nếu DateTime không xác định, chuyển về UTC
                            property.CurrentValue = DateTime.SpecifyKind(dateTimeValue, DateTimeKind.Utc);
                        }
                        else if (dateTimeValue.Kind == DateTimeKind.Local)
                        {
                            // Nếu DateTime là Local, chuyển về UTC
                            property.CurrentValue = dateTimeValue.ToUniversalTime();
                        }
                    }
                }
            }

            return base.SaveChanges();
        }
    }
}
