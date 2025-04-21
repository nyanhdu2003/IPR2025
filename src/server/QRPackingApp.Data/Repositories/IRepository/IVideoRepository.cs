using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QRPackingApp.Model;

namespace QRPackingApp.Data.Repositories.IRepository
{
    public interface IVideoRepository
    {
        Task<Video?> GetByIdAsync(Guid id);
        Task DeleteAsync(Video video);
        Task AddAsync(Video video);
        Task<List<Video>> GetVideosAsync(int pageNumber, int pageSize);
        Task<List<Video>> GetVideosByUserIdAsync(Guid userId);
        Task<List<Video>> GetAllIncludingAsync(Func<IQueryable<Video>, IQueryable<Video>> include, int skip, int take);


    }
}
