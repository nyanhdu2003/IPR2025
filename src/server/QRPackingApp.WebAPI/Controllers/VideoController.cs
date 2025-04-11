using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRPackingApp.Business.Services.IServices;
using QRPackingApp.Core.Controllers;
using QRPackingApp.DTO.Request;

namespace QRPackingApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : BaseController
    {
        private readonly IVideoService _videoService;

        public VideoController(IVideoService videoService)
        {
            _videoService = videoService;
        }

        [HttpPost("Upload")]
        [Authorize]
        public async Task<IActionResult> UploadVideo([FromForm]UploadVideoRequest request)
        {
            try
            {
                var result = await _videoService.UploadVideoAsync(request);
                return SuccessResponse(result, "Video uploaded successfully");
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
