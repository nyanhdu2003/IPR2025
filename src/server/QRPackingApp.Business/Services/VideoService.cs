using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query.Internal;
using QRPackingApp.Business.Services.IServices;
using QRPackingApp.Data.Repositories.IRepository;
using QRPackingApp.DTO.Request;
using QRPackingApp.Model;

namespace QRPackingApp.Business.Services
{
    public class VideoService : IVideoService
    {
        private readonly IVideoRepository _videoRepository;
        private readonly IAuthService _authService;

        public VideoService(IVideoRepository videoRepository, IAuthService authService)
        {
            _videoRepository = videoRepository;
            _authService = authService;
        }

        public async Task<string> UploadVideoAsync(UploadVideoRequest request)
        {
            var uploadAt = DateTime.UtcNow;
            var file = request.Video;
            var user = await _authService.GetCurrentUser();
            if(user == null)
                throw new UnauthorizedAccessException("Người dùng không hợp lệ.");
            if (file == null || file.Length == 0)
                throw new ArgumentException("File không hợp lệ.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Videos");


            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var safeTimestamp = uploadAt.ToString("yyyyMMdd_HHmmss"); 
            var fileName = $"{request.ProductId}_{safeTimestamp}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var relativePath = $"https://localhost:7007/Videos/{fileName}";

            // 📦 Lưu vào database
            var video = new Video
            {
                Id = Guid.NewGuid(),
                FilePath = relativePath,
                ProductId = request.ProductId,
                UserId = user.Id,
                StartedAt = request.StartedAt,
                EndedAt = request.EndedAt,
                UploadedAt = uploadAt,
            };

            await _videoRepository.AddAsync(video);
            return relativePath;
        }
    }
}
