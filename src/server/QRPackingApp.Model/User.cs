using Microsoft.AspNetCore.Identity;

namespace QRPackingApp.Model;

public class User
{
    public long Id { get; set; }
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string Role { get; set; } = null!;
    public DateTime CreatedAt { get; set; }

    public ICollection<Video> Videos { get; set; } = new List<Video>();
}
