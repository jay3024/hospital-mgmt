using Microsoft.AspNetCore.Mvc;
using SwasthyaHub.DTOs.Doctor;
using SwasthyaHub.Interfaces;
using System.Threading.Tasks;

namespace SwasthyaHub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public DoctorController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        // ✅ Get all doctors
        [HttpGet("GetAllDoctors")]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _doctorService.GetAllDoctorsAsync(); // → returns IEnumerable<GetAllDoctorsDto>
            return Ok(doctors);
        }

        // ✅ Get doctor by Id
        [HttpGet("GetDoctorById/{id}")]
        public async Task<IActionResult> GetDoctorById(int id)
        {
            var doctor = await _doctorService.GetDoctorByIdAsync(id); // → returns DoctorDetailDto
            if (doctor == null)
                return NotFound();

            return Ok(doctor);
        }

        // ✅ Get doctors by Hospital Id
        [HttpGet("GetDoctorByHospital/{hospitalId}")]
        public async Task<IActionResult> GetDoctorsByHospitalId(int hospitalId)
        {
            var doctors = await _doctorService.GetDoctorsByHospitalIdAsync(hospitalId); // → returns IEnumerable<GetDoctorsByHospitalIdDto>
            return Ok(doctors);
        }

       

        // ✅ Update doctor
        [HttpPut("UpdateDoctor/{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, [FromBody] UpdateDoctorDto dto)
        {
            // ensure ID comes from route
            dto.Id = id;

            var updatedDoctor = await _doctorService.UpdateDoctorAsync(dto); // → returns DoctorResponseDto
            if (updatedDoctor == null)
                return NotFound();

            return Ok(updatedDoctor);
        }

        
    }
}
