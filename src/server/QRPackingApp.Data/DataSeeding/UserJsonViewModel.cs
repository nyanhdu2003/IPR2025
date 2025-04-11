namespace QRPackingApp.Data.DataSeeding;

public class UserJsonViewModel
{
    public required Guid Id { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? FullName { get; set; }
    public string? Role { get; set; }
    public DateTime? CreatedAt { get; set; }
}
