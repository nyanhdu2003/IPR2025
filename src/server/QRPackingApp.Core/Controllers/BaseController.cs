using Microsoft.AspNetCore.Mvc;
using QRPackingApp.Core.APIResult;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace QRPackingApp.Core.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected IActionResult SuccessResponse<T>(T data, string message = "Operation successful.", string messageCode = "")
        {
            return Ok(new APIResult<T>
            {
                Code = 200,
                Success = true,
                Message = message,
                Data = data
            });
        }

   
        protected IActionResult NotFoundResponse(string message = "Object not found.", string messageCode = "")
        {
            return NotFound(new APIResult<object>
            {
                Code = 404,
                Success = false,
                Message = message,
                Data = ""
            });
        }

      
        protected IActionResult BadRequestResponse(string message = "Bad request.", string messageCode = "")
        {
            return BadRequest(new APIResult<object>
            {
                Code = 400,
                Success = false,
                Message = message,
                Data = ""
            });
        }


        protected IActionResult ErrorResponse(HttpStatusCode statusCode, string message, string messageCode = "")
        {
            if (statusCode == HttpStatusCode.NotFound)
            {
                return NotFoundResponse(message, messageCode);
            }

            if (statusCode == HttpStatusCode.BadRequest)
            {
                return BadRequestResponse(message, messageCode);
            }

            return StatusCode((int)statusCode, new APIResult<object>
            {
                Code = (int)statusCode,
                Success = false,
                Message = message,
                Data = ""
            });
        }


        protected IActionResult HandleException(Exception exception, string messageCode = "")
        {
            var message = exception.Message ?? "An error occurred while processing your request.";
            // Log the exception here if needed.
            return ErrorResponse(HttpStatusCode.InternalServerError, message, messageCode);
        }
    }
}
