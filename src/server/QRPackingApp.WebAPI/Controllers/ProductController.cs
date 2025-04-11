using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRPackingApp.Business.Services.IServices;
using QRPackingApp.Core.Controllers;

namespace QRPackingApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : BaseController
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("{qrCode}")]
        [Authorize]
        public async Task<IActionResult> GetProductByQrCode([FromRoute]string qrCode)
        {
            try
            {
                var product = await _productService.GetProductByQRCodeAsync(qrCode);
                if (product == null)
                {
                    return NotFoundResponse("Product not found");
                }
                return SuccessResponse(product, "Product retrieved successfully");
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
