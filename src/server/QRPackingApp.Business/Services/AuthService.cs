﻿using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QRPackingApp.Business.Services.IServices;
using QRPackingApp.Data.Repositories.IRepository;
using QRPackingApp.DTO;
using QRPackingApp.DTO.Request;
using QRPackingApp.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace QRPackingApp.Business.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthService(IUserRepository userRepository, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<UserViewModel?> GetCurrentUser()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null || httpContext.User == null)
                return null;

            var userName = httpContext.User.FindFirst(ClaimTypes.Name)?.Value;

            if (userName == null)
                return null;

       
            return await _userRepository.GetUserByUsernameAsync(userName); ;
        }

        public async Task<string> LoginAsync(LoginRequest loginRequest)
        {
            var user = await _userRepository.GetUserByUsernameAndPasswordAsync(loginRequest);
            if (user != null)
            {
                var token = GenerateToken(user);
                return token;
            }
            return String.Empty;
        }

        private string GenerateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var settingkey = _configuration.GetSection("JWT:Key").Value ?? throw new Exception("No secret key found");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settingkey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken
            (
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
