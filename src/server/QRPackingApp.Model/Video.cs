using System.ComponentModel.DataAnnotations;

namespace QRPackingApp.Model;

public class Video
{   
    [Required]
    public required Guid Id { get; set; } = Guid.NewGuid();
    public string? FilePath { get; set; }

    [Required]
    public required Guid ProductId { get; set; }

    [Required]
    public required Guid UserId { get; set; }

    public DateTime? StartedAt { get; set; }
    public DateTime? EndedAt { get; set; }
    public DateTime? UploadedAt { get; set; }

    public Product? Product { get; set; }
    public User? User { get; set; }
}
