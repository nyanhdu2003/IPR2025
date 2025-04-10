using System;

namespace QRPackingApp.Model;

public class Product
{
    public long Id { get; set; }
    public string QrCode { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<Video> Videos { get; set; } = new List<Video>();
}
