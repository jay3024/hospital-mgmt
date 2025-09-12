using System.ComponentModel.DataAnnotations;

public class HospitalDto
{
    public int? HospitalId { get; set; } // Only needed for updates

    [Required]
    public string Name { get; set; }

    [Required]
    public string Address { get; set; }

    [Required]
    public string Phone { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string LicenseNumber { get; set; }

    [Required]
    public string City { get; set; }

    [Required]
    public string State { get; set; }

    [Required]
    public string PinCode { get; set; }
}
