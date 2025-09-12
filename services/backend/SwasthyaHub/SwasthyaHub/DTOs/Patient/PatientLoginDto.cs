using System.ComponentModel.DataAnnotations;

namespace SwasthyaHub.DTOs.Patient
{
    public class PatientLoginDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
