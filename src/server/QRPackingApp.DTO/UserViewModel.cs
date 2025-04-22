namespace QRPackingApp.DTO
{
    public class UserViewModel
    {   
        public required Guid Id { get; set; }
        public string? FullName { get; set; }
        public string? Role { get; set; }
        
    }
}