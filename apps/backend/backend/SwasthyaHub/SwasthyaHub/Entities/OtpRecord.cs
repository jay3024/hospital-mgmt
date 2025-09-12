using System.ComponentModel.DataAnnotations;

namespace SwasthyaHub.Entities
{
    public class OtpRecord
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string OtpCode { get; set; }
        public string UserType { get; set; } // "Patient" or "Doctor"
        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
        public bool IsUsed { get; set; } = false;
    }
}
