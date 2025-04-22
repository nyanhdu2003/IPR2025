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
    public class AuthController : BaseController
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var token = await _authService.LoginAsync(request);
                if (string.IsNullOrEmpty(token))
                {
                    return BadRequestResponse();
                }

                return SuccessResponse(token, "Login successful");
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var user = await _authService.GetCurrentUser();
                if (user == null)
                {
                    return NotFoundResponse("User not found");
                }
                return SuccessResponse(user, "User retrieved successfully");
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
