using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace QRPackingApp.DTO.Request
{
    public class UploadVideoRequest
    {
        public Guid ProductId { get; set; }
        public IFormFile Video { get; set; } = null!;
        public DateTime StartedAt { get; set; } = DateTime.UtcNow;
        public DateTime EndedAt { get; set; } = DateTime.UtcNow;
    }
}
