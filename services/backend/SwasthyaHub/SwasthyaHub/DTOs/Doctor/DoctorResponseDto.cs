namespace SwasthyaHub.DTOs.Doctor
{
    public class DoctorResponseDto
    {
        public int Id { get; set; } // Unique doctor ID (DB-generated)

        // Foreign key
        public int HospitalId { get; set; }

        public string FullName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string AadhaarNumber { get; set; }
        public string RegistrationNumber { get; set; }
        public string Specialization { get; set; }
        public string Qualifications { get; set; }
        public int YearsOfExperience { get; set; }
        public string ClinicAddress { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }
        public string EmergencyContactName { get; set; }
        public string EmergencyContactNumber { get; set; }

        // System managed
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; } // for tracking updates
    }
}
