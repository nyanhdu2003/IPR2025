using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QRPackingApp.DTO.Request;
using QRPackingApp.Model;

namespace QRPackingApp.Business.Services.IServices
{
    public interface IVideoService
    {
        Task<string> UploadVideoAsync(UploadVideoRequest request);
        Task<List<Video>> GetPaginatedVideosAsync(int pageNumber, int pageSize);
        Task<Video?> GetVideoByIdAsync(Guid id);
        Task DeleteVideoByIdAsync(Guid id);
    }
}
