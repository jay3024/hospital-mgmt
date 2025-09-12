public interface IPatientService
{
    Task<IEnumerable<PatientResponseDto>> GetAllPatientsAsync();
    Task<PatientResponseDto> GetPatientByIdAsync(int id);
  
    Task<PatientResponseDto> UpdatePatientAsync(int id, PatientUpdateDto dto);
    Task<bool> DeletePatientAsync(int id);

    Task<IEnumerable<PatientResponseDto>> GetPatientsAsync(PatientFilterDto dto);
}
