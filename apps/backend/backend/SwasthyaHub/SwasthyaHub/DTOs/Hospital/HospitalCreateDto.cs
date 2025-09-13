using System.ComponentModel.DataAnnotations;

namespace SwasthyaHub.DTOs.Hospital
{
    public class HospitalCreateDto



    {

        [Required]
        public string Username { get; set; }

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
        public string Password { get; set; }

        [Required]
        public string ContactNumber { get; set; }

        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string Status { get; set; }
    }
}
