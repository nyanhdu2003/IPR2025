using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QRPackingApp.DTO;
using QRPackingApp.DTO.Request;
using QRPackingApp.Model;

namespace QRPackingApp.Business.Services.IServices
{
    public interface IVideoService
    {
        Task<string> UploadVideoAsync(UploadVideoRequest request);
        Task<List<HistoryVideoViewModel>> GetAllVideosAsync(int pageNumber, int pageSize);
        Task<HistoryVideoViewModel?> GetVideoByIdAsync(Guid id);
        Task<List<HistoryVideoViewModel>> GetVideosByUserIdAsync();
        Task<List<HistoryVideoViewModel>> GetVideosByProductIdAsync(Guid productId);
        Task DeleteVideoByIdAsync(Guid id);
    }
}
