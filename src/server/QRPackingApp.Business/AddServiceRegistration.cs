using Microsoft.Extensions.DependencyInjection;
using QRPackingApp.Business.Services;
using QRPackingApp.Business.Services.IServices;

namespace QRPackingApp.Business;

public static class AddServiceRegistration
{
    public static void AddBusinessServices(this IServiceCollection services)
    {
        // Register your services here
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IVideoService, VideoService>();
        
    }
}
