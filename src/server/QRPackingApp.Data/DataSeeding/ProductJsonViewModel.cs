namespace QRPackingApp.Data.DataSeeding;

public class ProductJsonViewModel
{
    public Guid Id { get; set; }
    public string QrCode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;

}
