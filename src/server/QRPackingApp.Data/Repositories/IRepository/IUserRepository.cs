using QRPackingApp.DTO;
using QRPackingApp.DTO.Request;
using QRPackingApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QRPackingApp.Data.Repositories.IRepository
{
    public interface IUserRepository
    {
        Task<User?> GetUserByUsernameAndPasswordAsync(LoginRequest request);
        Task<UserViewModel?> GetUserByUsernameAsync(string userName);
    }
}
