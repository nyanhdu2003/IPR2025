using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QRPackingApp.Business.Services.IServices;
using QRPackingApp.Data.Repositories;
using QRPackingApp.Data.Repositories.IRepository;
using QRPackingApp.Model;

namespace QRPackingApp.Business.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<Product?> GetProductByQRCodeAsync(string qrCode)
        {
            return await _productRepository.GetByQrCodeAsync(qrCode);
        }
    }
}
