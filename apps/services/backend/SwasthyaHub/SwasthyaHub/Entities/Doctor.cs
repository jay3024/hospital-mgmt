using System;
using System.ComponentModel.DataAnnotations;

namespace SwasthyaHub.Entities
{
    public class Doctor
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string DoctorCode { get; set; }  // Unique doctor code

        // Basic Info
        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }
        [Required]
        public string Username { get; set; }



        // Store securely
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        // Contact & Identity
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string AadhaarNumber { get; set; }

        // Professional Info
        [Required]
        public string RegistrationNumber { get; set; }  // Medical Council Registration
        [Required]
        public string Specialization { get; set; }
        public string Qualifications { get; set; }
        public int YearsOfExperience { get; set; }
        public string ClinicAddress { get; set; }


        // Foreign key
        public int HospitalId { get; set; }

        // Address
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }

        // Emergency
        public string EmergencyContactName { get; set; }
        public string EmergencyContactNumber { get; set; }

        // Metadata
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
