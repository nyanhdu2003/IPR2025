using System.ComponentModel.DataAnnotations;

namespace QRPackingApp.Model;

public class Product
{
    [Required]
    public required Guid Id { get; set; } = Guid.NewGuid();
    public string? QrCode { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public DateTime? CreatedAt { get; set; }

    public ICollection<Video> Videos { get; set; } = new List<Video>();
}
