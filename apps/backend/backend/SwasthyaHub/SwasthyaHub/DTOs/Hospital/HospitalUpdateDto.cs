using System.ComponentModel.DataAnnotations;

namespace SwasthyaHub.DTOs.Hospital
{
    public class HospitalUpdateDto
    {
        [Required]
        public int Id { get; set; }   // required for update

        public string Name { get; set; }
        public string Phone { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string LicenseNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PinCode { get; set; }
        public string ContactNumber { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string Status { get; set; }
    }
}
