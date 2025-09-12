using SwasthyaHub.DTOs.Patient;

namespace SwasthyaHub.Interfaces
{
    public interface IAuthService
    {
        Task<bool> RegisterPatientAsync(PatientSignupDto dto);
        Task<AuthResponseDto> LoginAsync(PatientLoginDto dto);
    }
}
