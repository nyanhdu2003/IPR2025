using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QRPackingApp.DTO
{
    public class HistoryVideoViewModel
    {
        public required string ProductName { get; set; }
        public required string UserName { get; set; }
        public DateTime? StartAt { get; set; }
        public DateTime? EndAt { get; set; }

        // Thời lượng tính bằng phút
        public double Duration => StartAt.HasValue && EndAt.HasValue
            ? Math.Round((EndAt.Value - StartAt.Value).TotalMinutes, 2)
            : 0;

        // Thời gian tạo video (hoặc thời điểm bắt đầu)
        public DateTime? CreatedAt => StartAt;
    }
}
