using SwasthyaHub.DTOs.Hospital;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SwasthyaHub.Interfaces
{
    public interface IHospitalService
    {
        Task<HospitalResponseDto> AddHospitalAsync(HospitalCreateDto dto);
        Task<HospitalResponseDto> UpdateHospitalAsync(HospitalUpdateDto dto);
        Task<bool> DeleteHospitalAsync(int id);
        Task<HospitalResponseDto> GetHospitalByIdAsync(int id);
        Task<IEnumerable<HospitalResponseDto>> GetAllHospitalsAsync();

        Task<HospitalAuthResponseDto> HospitalLoginAsync(HospitalLoginDto dto);
    }
}
