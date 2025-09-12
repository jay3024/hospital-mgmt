namespace SwasthyaHub.Entities
{
    public class PatientHospital
    {
        public int PatientId { get; set; }
        public int HospitalId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public Patient Patient { get; set; }
        public Hospital Hospital { get; set; }
    }
}
