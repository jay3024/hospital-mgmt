using SwasthyaHub.DTOs;
using SwasthyaHub.DTOs.Patient;

namespace SwasthyaHub.Interfaces
{
    public interface IPasswordResetService
    {
        Task<AuthResponseDto> SendOtpAsync(ForgotPasswordDto request);
        //Task<AuthResponseDto> VerifyOtpAsync(VerifyOtpDto request);
        Task<AuthResponseDto> ResetPasswordAsync(ResetPasswordDto request);
    }
}
