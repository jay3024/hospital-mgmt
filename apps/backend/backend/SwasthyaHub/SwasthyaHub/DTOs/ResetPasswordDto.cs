namespace SwasthyaHub.DTOs
{
    public class ResetPasswordDto
    {
        public string Email { get; set; }
        public string OtpCode { get; set; }
        public string NewPassword { get; set; }
        public string UserType { get; set; }
    }
}
