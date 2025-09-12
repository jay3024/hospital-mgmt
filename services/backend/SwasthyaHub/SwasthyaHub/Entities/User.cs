using System.ComponentModel.DataAnnotations;

namespace SwasthyaHub.Entities
{
    public class User
    {
        public int UserId { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string Name { get; set; }

        public string Phone { get; set; }

        [Required]
        public UserRole Role { get; set; }

        /// <summary>
        /// For Doctor → DoctorId
        /// For Patient → PatientId
        /// For HospitalAdmin → HospitalId
        /// For SuperAdmin → null
        /// </summary>
        public int? LinkedId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Optional government ID for compliance (Aadhaar, etc.)
        public string? GovtId { get; set; }
    }

    public enum UserRole
    {
        SuperAdmin,
        HospitalAdmin,
        Doctor,
        Patient
    }
}
