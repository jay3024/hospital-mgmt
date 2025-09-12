namespace SwasthyaHub.DTOs.Patient
{
    public class AuthResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string Token { get; set; } // Keep your existing properties
        public object User { get; set; }  // Keep your existing properties

        public string Username { get; set; } // Keep your existing properties

        public string Email { get; set; } // Keep your existing properties
        // ... any other existing properties
    }
}

