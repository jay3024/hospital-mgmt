namespace SwasthyaHub.Entities
{
    // Entities/DoctorHospital.cs
    public class DoctorHospital
    {
        public int DoctorId { get; set; }
        public int HospitalId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public Doctor Doctor { get; set; }
        public Hospital Hospital { get; set; }
    }

   

}
