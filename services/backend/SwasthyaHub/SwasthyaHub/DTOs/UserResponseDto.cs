using SwasthyaHub.Entities;

public class UserResponseDto
{
    public int UserId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public UserRole Role { get; set; }
    public int? LinkedId { get; set; }
    public DateTime CreatedAt { get; set; }
}
