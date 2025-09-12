// Entities/Hospital.cs
using System.ComponentModel.DataAnnotations;

namespace SwasthyaHub.Entities
{
    public class Hospital

    {

        public int Id { get; set; }  // Primary key
        public int HospitalId { get; set; }

        [Required]
        public string Name { get; set; }

     

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

        [Required]
        public string ContactNumber { get; set; }

        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public HospitalStatus Status { get; set; } = HospitalStatus.Active;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public ICollection<DoctorHospital> DoctorHospitals { get; set; }
        public ICollection<PatientHospital> PatientHospitals { get; set; }
    }

    public enum HospitalStatus
    {
        Active,
        Inactive,
        Suspended,
        Pending
    }
}
