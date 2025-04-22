using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using QRPackingApp.Business.Services.IServices;
using QRPackingApp.Data.Repositories.IRepository;
using QRPackingApp.DTO;
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

        public async Task DeleteVideoByIdAsync(Guid id)
        {
            var video = await _videoRepository.GetByIdAsync(id);
            if (video == null)
            {
                throw new KeyNotFoundException("Video not found");
            }

            // Delete the video file from the file system
            if (!string.IsNullOrEmpty(video.FilePath))
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Videos", Path.GetFileName(video.FilePath));
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
            }

            // Delete the video record from the database
            await _videoRepository.DeleteAsync(video);
        }

        public async Task<List<HistoryVideoViewModel>> GetAllVideosAsync(int pageNumber, int pageSize)
        {
            var videos = await _videoRepository.GetAllIncludingAsync(
                include: q => q.Include(v => v.Product)
                               .Include(v => v.User),
                skip: (pageNumber - 1) * pageSize,
                take: pageSize
            );

            var result = videos.Select(v => new HistoryVideoViewModel
            {
                Id = v.Id,
                ProductName = v.Product.Name ,
                UserName = v.User.Username ,
                StartAt = v.StartedAt,
                EndAt = v.EndedAt,
                FilePath = v.FilePath
            }).ToList();

            return result;
        }

        public async Task<HistoryVideoViewModel?> GetVideoByIdAsync(Guid id)
        {
            return await _videoRepository.GetVideoByIdAsync(id);
        }

        public Task<List<HistoryVideoViewModel>> GetVideosByProductIdAsync(Guid productId)
        {
            return _videoRepository.GetVideosByProductIdAsync(productId);
        }

        public async Task<List<HistoryVideoViewModel>> GetVideosByUserIdAsync()
        {
            var user = await _authService.GetCurrentUser()
                ?? throw new Exception("Error");
            return await _videoRepository.GetVideosByUserIdAsync(user.Id);
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

            var relativePath = $"http://192.168.250.210:7007/Videos/{fileName}";

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
