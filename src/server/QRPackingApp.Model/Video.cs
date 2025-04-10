namespace QRPackingApp.Model;

public class Video
{
    public long Id { get; set; }
    public string FilePath { get; set; } = null!;
    public long ProductId { get; set; }
    public long UserId { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime EndedAt { get; set; }
    public DateTime UploadedAt { get; set; }

    public Product Product { get; set; } = null!;
    public User User { get; set; } = null!;
}
