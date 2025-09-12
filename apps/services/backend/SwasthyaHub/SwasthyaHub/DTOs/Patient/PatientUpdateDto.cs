public class PatientUpdateDto
{
    public string FullName { get; set; }
    public string PhoneNumber { get; set; }
    public string Gender { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string AadhaarNumber { get; set; }

    public string AddressLine1 { get; set; }
    public string AddressLine2 { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Pincode { get; set; }

    public float? HeightInCm { get; set; }
    public float? WeightInKg { get; set; }
    public string BloodGroup { get; set; }
    public string KnownAllergies { get; set; }

    public string EmergencyContactName { get; set; }
    public string EmergencyContactNumber { get; set; }
}