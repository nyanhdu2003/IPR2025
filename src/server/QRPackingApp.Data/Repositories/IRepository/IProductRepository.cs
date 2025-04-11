using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QRPackingApp.Model;

namespace QRPackingApp.Data.Repositories.IRepository
{
    public interface IProductRepository
    {
        Task<Product?> GetByQrCodeAsync(string qrCode);
    }
}
