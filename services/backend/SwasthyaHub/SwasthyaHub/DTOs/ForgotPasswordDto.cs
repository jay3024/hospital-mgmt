namespace SwasthyaHub.DTOs
{
    public class ForgotPasswordDto
    {
        public string Email { get; set; }
        public string UserType { get; set; } // "Patient" or "Doctor"
    }
}
