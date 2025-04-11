using System.ComponentModel.DataAnnotations;

namespace QRPackingApp.Model;

public class User
{   
    [Required]
    public required Guid Id { get; set; } = Guid.NewGuid();
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? FullName { get; set; }
    public string? Role { get; set; }
    public DateTime? CreatedAt { get; set; }
    public ICollection<Video> Videos { get; set; } = new List<Video>();
}
