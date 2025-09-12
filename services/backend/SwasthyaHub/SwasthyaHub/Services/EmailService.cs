using SwasthyaHub.Interfaces;
using System.Net;
using System.Net.Mail;

namespace SwasthyaHub.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<bool> SendOtpEmailAsync(string toEmail, string otpCode, string userName)
        {
            try
            {
                var smtpClient = new SmtpClient(_configuration["EmailSettings:SmtpServer"])
                {
                    Port = int.Parse(_configuration["EmailSettings:Port"]),
                    Credentials = new NetworkCredential(
                        _configuration["EmailSettings:Username"],
                        _configuration["EmailSettings:Password"]
                    ),
                    EnableSsl = true,
                    UseDefaultCredentials = false, // Add this
                    Timeout = 30000 // Add timeout (30 seconds)
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_configuration["EmailSettings:FromEmail"], "SwasthyaHub"),
                    Subject = "Password Reset OTP - SwasthyaHub",
                    Body = $@"
                <html>
                <body>
                    <h2>Password Reset Request</h2>
                    <p>Dear {userName},</p>
                    <p>You have requested to reset your password. Please use the following OTP code:</p>
                    <h3 style='color: #007bff; font-size: 24px; letter-spacing: 3px;'>{otpCode}</h3>
                    <p>This OTP will expire in 10 minutes.</p>
                    <p>If you didn't request this password reset, please ignore this email.</p>
                    <br>
                    <p>Best regards,<br>SwasthyaHub Team</p>
                </body>
                </html>",
                    IsBodyHtml = true
                };

                mailMessage.To.Add(toEmail);
                await smtpClient.SendMailAsync(mailMessage);

                // Dispose resources
                mailMessage.Dispose();
                smtpClient.Dispose();

                return true;
            }
            catch (Exception ex)
            {
                // Log the actual error for debugging
                Console.WriteLine($"Email sending failed: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return false;
            }
        }


    }
}
