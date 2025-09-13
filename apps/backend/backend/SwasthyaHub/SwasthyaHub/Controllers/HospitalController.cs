using Microsoft.AspNetCore.Mvc;
using SwasthyaHub.DTOs.Hospital;
using SwasthyaHub.Interfaces;
using System.Threading.Tasks;

namespace SwasthyaHub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HospitalController : ControllerBase
    {
        private readonly IHospitalService _hospitalService;



        public HospitalController(IHospitalService hospitalService)
        {
            _hospitalService = hospitalService;
        }


       

        [HttpPost("HospitalLogin")]
        public async Task<IActionResult> HospitalLogin([FromBody] HospitalLoginDto dto)
        {
            if (dto == null)
                return BadRequest(new { message = "Invalid request body" });

            var response = await _hospitalService.HospitalLoginAsync(dto);

            if (response == null)
                return Unauthorized(new { message = "Invalid Email Address or Password" });

            return Ok(new
            {
                success = true,
                message = "Login Successful",
                token = response.Token,
                username = response.Username,
                email = response.Email
            });
        }


        [HttpPost("addHopsital")]
        public async Task<IActionResult> AddHospital([FromBody] HospitalCreateDto dto)
        {
            var response = await _hospitalService.AddHospitalAsync(dto);
            return Ok(response);
        }

        [HttpPut("updateHospital")]
        public async Task<IActionResult> UpdateHospital([FromBody] HospitalUpdateDto dto)
        {
            var response = await _hospitalService.UpdateHospitalAsync(dto);
            if (response == null) return NotFound(new { message = "Hospital not found" });
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetHospitalById(int id)
        {
            var response = await _hospitalService.GetHospitalByIdAsync(id);
            if (response == null) return NotFound(new { message = "Hospital not found" });
            return Ok(response);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllHospitals()
        {
            var response = await _hospitalService.GetAllHospitalsAsync();
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHospital(int id)
        {
            var success = await _hospitalService.DeleteHospitalAsync(id);
            if (!success) return NotFound(new { message = "Hospital not found" });
            return Ok(new { message = "Hospital deleted successfully" });
        }
    }
}
