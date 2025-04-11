using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QRPackingApp.Model;

namespace QRPackingApp.Business.Services.IServices
{
    public interface IProductService
    {
        Task<Product?> GetProductByQRCodeAsync(string qrCode);
    }
}
