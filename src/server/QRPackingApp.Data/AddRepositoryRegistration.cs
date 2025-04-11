using Microsoft.Extensions.DependencyInjection;
using QRPackingApp.Data.Repositories;
using QRPackingApp.Data.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QRPackingApp.Data
{
    public static class AddRepositoryRegistration
    {
        public static void AddRepositoryServices(this IServiceCollection services)
        {
            // Register your services here
            services.AddScoped<IUserRepository, UserRepository>();

        }
    }
}
