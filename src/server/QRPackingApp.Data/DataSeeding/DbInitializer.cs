using Newtonsoft.Json;
using QRPackingApp.Model;

namespace QRPackingApp.Data.DataSeeding
{
    public class DbInitializer
    {
        public static void Seed(QRPackingAppDbContext context, string userJsonPath, string videoJsonPath, string productJsonPath) 
        {
            context.Database.EnsureCreated();

            // Đọc file JSON
            string jsonUsers = File.ReadAllText(userJsonPath);
            var users = JsonConvert.DeserializeObject<List<UserJsonViewModel>>(jsonUsers);

            string jsonVideos = File.ReadAllText(videoJsonPath);
            var videos = JsonConvert.DeserializeObject<List<VideoJsonViewModel>>(jsonVideos);

            string jsonProducts = File.ReadAllText(productJsonPath);
            var products = JsonConvert.DeserializeObject<List<ProductJsonViewModel>>(jsonProducts);

            // Kiểm tra nếu dữ liệu null
            if (users == null || videos == null || products == null)
            {
                return;
            }

            // Gọi các phương thức seeding
            SeedUsers(context, users);
            SeedProducts(context, products);
            SeedVideos(context, videos);
        }

        // Phương thức seeding người dùng
        private static void SeedUsers(QRPackingAppDbContext context, List<UserJsonViewModel> users)
        {
            foreach (var user in users)
            {
                // Kiểm tra người dùng đã tồn tại chưa
                if (!context.Users.Any(u => u.Username == user.Username))
                {
                    var newUser = new User
                    {
                        Id = Guid.NewGuid(), // Đảm bảo ID là duy nhất
                        Username = user.Username,
                        Password = user.Password,
                        FullName = user.FullName,
                        Role = user.Role,
                        CreatedAt = DateTime.UtcNow,
                    };

                    context.Users.Add(newUser);
                }
            }

            context.SaveChanges();
        }

        // Phương thức seeding sản phẩm
        private static void SeedProducts(QRPackingAppDbContext context, List<ProductJsonViewModel> products)
        {
            foreach (var product in products)
            {
                // Kiểm tra sản phẩm đã tồn tại chưa
                if (!context.Products.Any(p => p.QrCode == product.QrCode)) // Kiểm tra qua QrCode hoặc Id nếu cần
                {
                    var newProduct = new Product
                    {
                        Id = Guid.NewGuid(), // Đảm bảo ID là duy nhất
                        QrCode = product.QrCode,
                        Name = product.Name,
                        Description = product.Description,
                        CreatedAt = DateTime.UtcNow,
                    };

                    context.Products.Add(newProduct);
                }
            }

            context.SaveChanges();
        }

        // Phương thức seeding video
        private static void SeedVideos(QRPackingAppDbContext context, List<VideoJsonViewModel> videos)
        {
            foreach (var video in videos)
            {
                // Kiểm tra video đã tồn tại chưa
                if (!context.Videos.Any(v => v.FilePath == video.FilePath)) // Kiểm tra qua FilePath hoặc Id nếu cần
                {
                    var newVideo = new Video
                    {
                        Id = Guid.NewGuid(), // Đảm bảo ID là duy nhất
                        ProductId = video.ProductId,
                        UserId = video.UserId,
                        UploadedAt = DateTime.UtcNow,
                        StartedAt = DateTime.UtcNow,
                        EndedAt = DateTime.UtcNow,
                        FilePath = video.FilePath,
                        Product = context.Products.FirstOrDefault(p => p.Id == video.ProductId),
                        User = context.Users.FirstOrDefault(u => u.Id == video.UserId)
                    };

                    context.Videos.Add(newVideo);
                }
            }

            context.SaveChanges();
        }
    }
}
