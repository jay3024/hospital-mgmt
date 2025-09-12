using Microsoft.EntityFrameworkCore;
using SwasthyaHub.Data;
using SwasthyaHub.DTOs;
using SwasthyaHub.DTOs.Patient;
using SwasthyaHub.Entities;
using SwasthyaHub.Helpers;
using SwasthyaHub.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace SwasthyaHub.Services
{
    public class PasswordResetService : IPasswordResetService
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public PasswordResetService(ApplicationDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // Helper method for password hashing with salt
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<AuthResponseDto> SendOtpAsync(ForgotPasswordDto request)
        {
            try
            {
                // Check if user exists based on type
                string userName = "";
                if (request.UserType.ToLower() == "patient")
                {
                    var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Email == request.Email);

                    if (patient == null)
                        return new AuthResponseDto { Success = false, Message = "Patient not found with this email." };
                    userName = patient.FullName;
                }
                else if (request.UserType.ToLower() == "doctor")
                {
                    var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Email == request.Email);
                    if (doctor == null)
                        return new AuthResponseDto { Success = false, Message = "Doctor not found with this email." };
                    userName = doctor.FullName;
                }
                else
                {
                    return new AuthResponseDto { Success = false, Message = "Invalid user type." };
                }

                // Generate 6-digit OTP
                var random = new Random();
                var otpCode = random.Next(100000, 999999).ToString();

                // Remove existing OTPs for this email and user type
                var existingOtps = _context.OtpRecords
                    .Where(o => o.Email == request.Email && o.UserType == request.UserType);
                _context.OtpRecords.RemoveRange(existingOtps);

                // Create new OTP record
                var otpRecord = new OtpRecord
                {
                    Email = request.Email,
                    OtpCode = otpCode,
                    UserType = request.UserType,
                    CreatedAt = DateTime.UtcNow,
                    ExpiresAt = DateTime.UtcNow.AddMinutes(10), // OTP expires in 10 minutes
                    IsUsed = false
                };

                _context.OtpRecords.Add(otpRecord);
                await _context.SaveChangesAsync();

                // Debug: Log OTP creation
                Console.WriteLine($"=== OTP CREATED ===");
                Console.WriteLine($"Email: {request.Email}");
                Console.WriteLine($"OTP: {otpCode}");
                Console.WriteLine($"UserType: {request.UserType}");
                Console.WriteLine($"Created: {otpRecord.CreatedAt}");
                Console.WriteLine($"Expires: {otpRecord.ExpiresAt}");
                Console.WriteLine($"==================");

                // Send OTP via email
                var emailSent = await _emailService.SendOtpEmailAsync(request.Email, otpCode, userName);

                if (!emailSent)
                {
                    return new AuthResponseDto { Success = false, Message = "Failed to send OTP email." };
                }

                return new AuthResponseDto
                {
                    Success = true,
                    Message = "OTP has been sent to your email address. Please check your inbox."
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"SendOTP Exception: {ex.Message}");
                return new AuthResponseDto { Success = false, Message = "An error occurred while sending OTP." };
            }
        }

        // Combined OTP verification and password reset
        public async Task<AuthResponseDto> ResetPasswordAsync(ResetPasswordDto request)
        {
            try
            {
                // Debug: Log the incoming request
                Console.WriteLine($"=== RESET PASSWORD DEBUG ===");
                Console.WriteLine($"Email: '{request.Email}'");
                Console.WriteLine($"OTP Code: '{request.OtpCode}'");
                Console.WriteLine($"User Type: '{request.UserType}'");
                Console.WriteLine($"Current UTC Time: {DateTime.UtcNow}");

                // Check what OTP records exist for this email and user type
                var allOtpRecords = await _context.OtpRecords
                    .Where(o => o.Email.ToLower() == request.Email.ToLower()
                               && o.UserType.ToLower() == request.UserType.ToLower())
                    .OrderByDescending(o => o.CreatedAt)
                    .ToListAsync();

                Console.WriteLine($"Total OTP records for this email/type: {allOtpRecords.Count}");
                foreach (var record in allOtpRecords)
                {
                    Console.WriteLine($"Record ID: {record.Id}");
                    Console.WriteLine($"  OTP: '{record.OtpCode}'");
                    Console.WriteLine($"  Used: {record.IsUsed}");
                    Console.WriteLine($"  Expires: {record.ExpiresAt}");
                    Console.WriteLine($"  Created: {record.CreatedAt}");
                    Console.WriteLine($"  Is Expired: {record.ExpiresAt <= DateTime.UtcNow}");
                    Console.WriteLine($"  Matches Code: {record.OtpCode?.Trim() == request.OtpCode?.Trim()}");
                    Console.WriteLine("---");
                }

                // Verify OTP with improved comparison (case-insensitive and trimmed)
                var otpRecord = await _context.OtpRecords
                    .FirstOrDefaultAsync(o => o.Email.ToLower().Trim() == request.Email.ToLower().Trim()
                                         && o.OtpCode.Trim() == request.OtpCode.Trim()
                                         && o.UserType.ToLower().Trim() == request.UserType.ToLower().Trim()
                                         && !o.IsUsed
                                         && o.ExpiresAt > DateTime.UtcNow);

                if (otpRecord == null)
                {
                    Console.WriteLine("❌ OTP Record not found or invalid!");

                    // Additional specific checks
                    var expiredOtp = await _context.OtpRecords
                        .FirstOrDefaultAsync(o => o.Email.ToLower().Trim() == request.Email.ToLower().Trim()
                                             && o.OtpCode.Trim() == request.OtpCode.Trim()
                                             && o.UserType.ToLower().Trim() == request.UserType.ToLower().Trim()
                                             && !o.IsUsed);

                    if (expiredOtp != null && expiredOtp.ExpiresAt <= DateTime.UtcNow)
                    {
                        Console.WriteLine("🕐 OTP has expired!");
                        return new AuthResponseDto { Success = false, Message = "OTP has expired. Please request a new one." };
                    }

                    var usedOtp = await _context.OtpRecords
                        .FirstOrDefaultAsync(o => o.Email.ToLower().Trim() == request.Email.ToLower().Trim()
                                             && o.OtpCode.Trim() == request.OtpCode.Trim()
                                             && o.UserType.ToLower().Trim() == request.UserType.ToLower().Trim()
                                             && o.IsUsed);

                    if (usedOtp != null)
                    {
                        Console.WriteLine("🔒 OTP has already been used!");
                        return new AuthResponseDto { Success = false, Message = "OTP has already been used. Please request a new one." };
                    }

                    Console.WriteLine("================================");
                    return new AuthResponseDto { Success = false, Message = "Invalid OTP. Please check and try again." };
                }

                Console.WriteLine("✅ OTP Record found and valid!");
                Console.WriteLine($"Found OTP ID: {otpRecord.Id}");
                Console.WriteLine($"================================");

                // Create password hash and salt
                CreatePasswordHash(request.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);

                // Update password based on user type
                if (request.UserType.ToLower() == "patient")
                {
                    var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Email.ToLower() == request.Email.ToLower());
                    if (patient != null)
                    {
                        patient.PasswordHash = passwordHash;
                        patient.PasswordSalt = passwordSalt;
                        _context.Patients.Update(patient);
                        Console.WriteLine("✅ Patient password updated");
                    }
                    else
                    {
                        Console.WriteLine("❌ Patient not found for password update");
                        return new AuthResponseDto { Success = false, Message = "User not found." };
                    }
                }
                else if (request.UserType.ToLower() == "doctor")
                {
                    var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Email.ToLower() == request.Email.ToLower());
                    if (doctor != null)
                    {
                        doctor.PasswordHash = passwordHash;
                        doctor.PasswordSalt = passwordSalt;
                        _context.Doctors.Update(doctor);
                        Console.WriteLine("✅ Doctor password updated");
                    }
                    else
                    {
                        Console.WriteLine("❌ Doctor not found for password update");
                        return new AuthResponseDto { Success = false, Message = "User not found." };
                    }
                }

                // Mark OTP as used
                otpRecord.IsUsed = true;
                _context.OtpRecords.Update(otpRecord);

                await _context.SaveChangesAsync();
                Console.WriteLine("✅ Database updated successfully");

                return new AuthResponseDto { Success = true, Message = "Password reset successfully." };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Exception in ResetPassword: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return new AuthResponseDto { Success = false, Message = "An error occurred while resetting password." };
            }
        }
    }
}
