public class PatientFilterDto
{
    public int? HospitalId { get; set; }
    public int? DoctorId { get; set; } // optional if you later want doctor filter
    public bool ShowAll { get; set; } = false;
}
