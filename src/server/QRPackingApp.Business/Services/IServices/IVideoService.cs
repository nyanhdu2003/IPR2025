using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QRPackingApp.DTO.Request;

namespace QRPackingApp.Business.Services.IServices
{
    public interface IVideoService
    {
        Task<string> UploadVideoAsync(UploadVideoRequest request);
    }
}
