using System.ComponentModel.DataAnnotations;

public class PatientSignupDto


{


    

    // Basic Info
    [Required]

   
    public string FullName { get; set; }

    [Required, EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }

   

    // Contact & Identity
    [Required, Phone]
    public string PhoneNumber { get; set; }

    [Required]
    public string Gender { get; set; }

    // Male, Female, Other
    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required]
    public string AadhaarNumber { get; set; }    // Optional but useful for India

    // Address Info
    [Required]
    public string AddressLine1 { get; set; }

    public string AddressLine2 { get; set; }

    [Required]
    public string City { get; set; }

    [Required]
    public string State { get; set; }

    [Required]
    public string Pincode { get; set; }

    // Health Profile (Optional for signup, good for onboarding)
    [Required]
    public float? HeightInCm { get; set; }

    [Required]
    public float? WeightInKg { get; set; }

    [Required]
    public string BloodGroup { get; set; }

    // A+, B-, etc.
   
    public string KnownAllergies { get; set; }

    // Other
    [Required]
    public string EmergencyContactName { get; set; }

    [Required]
    public string EmergencyContactNumber { get; set; }

    // System-managed
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
