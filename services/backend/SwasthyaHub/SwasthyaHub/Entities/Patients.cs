using System.ComponentModel.DataAnnotations;

namespace SwasthyaHub.Entities
{
    public class Patient
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string PatientCode { get; set; }

        // Basic Info
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }

        // Store securely
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        // Contact & Identity
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string AadhaarNumber { get; set; }

        // Address
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }

        // Health Profile
        public float? HeightInCm { get; set; }
        public float? WeightInKg { get; set; }
        public string BloodGroup { get; set; }
        public string KnownAllergies { get; set; }

        // Emergency
        public string EmergencyContactName { get; set; }
        public string EmergencyContactNumber { get; set; }

        // Metadata
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


       
    }
}
