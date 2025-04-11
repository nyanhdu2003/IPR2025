using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QRPackingApp.Data.Repositories.IRepository;
using QRPackingApp.Model;

namespace QRPackingApp.Data.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly QRPackingAppDbContext _context;
    private readonly ILogger<ProductRepository> _logger;

    public ProductRepository(QRPackingAppDbContext context, ILogger<ProductRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Product?> GetByQrCodeAsync(string qrCode)
    {
        try
        {
            return await _context.Products
                .FirstOrDefaultAsync(p => p.QrCode == qrCode);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching product by QR code");
            throw;
        }
    }
}
