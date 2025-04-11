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
    }
}
