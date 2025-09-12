using SwasthyaHub.DTOs.Doctor;

public interface IDoctorService
{
    Task<DoctorResponseDto> AddDoctorAsync(DoctorSignupDto dto);
    Task<DoctorResponseDto> UpdateDoctorAsync(UpdateDoctorDto dto);
    Task<DoctorResponseDto> GetDoctorByIdAsync(int id);
    Task<IEnumerable<DoctorResponseDto>> GetAllDoctorsAsync();
    Task<IEnumerable<DoctorResponseDto>> GetDoctorsByHospitalIdAsync(int hospitalId);

    Task<DoctorAuthResponseDto> DoctorLoginAsync(DoctorLoginDto dto); 
}
