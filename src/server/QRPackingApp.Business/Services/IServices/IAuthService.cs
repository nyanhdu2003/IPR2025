using QRPackingApp.DTO.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QRPackingApp.Business.Services.IServices
{
    public interface IAuthService
    {
        Task<string> LoginAsync(LoginRequest loginRequest);
    }
}
