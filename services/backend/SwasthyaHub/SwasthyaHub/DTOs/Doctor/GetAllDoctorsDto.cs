namespace SwasthyaHub.DTOs.Doctor
{
    public class GetAllDoctorsDto
    {
        public int Id { get; set; } // Unique doctor ID
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public string Specialization { get; set; }
        public int YearsOfExperience { get; set; }
        public string ClinicAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}
