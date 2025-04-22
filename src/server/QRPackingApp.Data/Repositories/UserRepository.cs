using Azure.Core;
using Microsoft.EntityFrameworkCore;
using QRPackingApp.Data.Repositories.IRepository;
using QRPackingApp.DTO;
using QRPackingApp.DTO.Request;
using QRPackingApp.Model;
using System;

namespace QRPackingApp.Data.Repositories;

public class UserRepository : IUserRepository
{
    private readonly QRPackingAppDbContext _context;

    public UserRepository(QRPackingAppDbContext context)
    {
        _context = context;
    }
    public async Task<User?> GetUserByUsernameAndPasswordAsync(LoginRequest request)
    {
        return await _context.Users
            .SingleOrDefaultAsync(u => u.Username == request.Username && u.Password == request.Password);
    }

    public async Task<UserViewModel?> GetUserByUsernameAsync(string userName)
    {
        return await _context.Users
        .Where(u => u.Username == userName)
        .Select(u => new UserViewModel{
            Id = u.Id,
            FullName = u.FullName,
            Role = u.Role,
        })
        .SingleOrDefaultAsync();
    }
}
