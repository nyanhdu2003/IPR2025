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

        [HttpGet("videos")]
        [Authorize]
        public async Task<IActionResult> GetListVideos([FromQuery] int pageNumber = 1,  int pageSize = 5)
        {
            try
            {
                var videos = await _videoService.GetPaginatedVideosAsync(pageNumber, pageSize);
                return SuccessResponse(videos, "Videos retrieved successfully");
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetVideoById(Guid id)
        {
            try
            {
                var video = await _videoService.GetVideoByIdAsync(id);
                if (video == null)
                {
                    return NotFoundResponse("Video not found");
                }
                return SuccessResponse(video, "Video retrieved successfully");
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteVideoById(Guid id)
        {
            try
            {
                await _videoService.DeleteVideoByIdAsync(id);
                return SuccessResponse("Video deleted successfully");
            }
            catch (KeyNotFoundException)
            {
                return NotFoundResponse("Video not found");
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }


    }
}
