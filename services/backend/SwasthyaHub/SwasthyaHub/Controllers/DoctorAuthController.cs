using Microsoft.AspNetCore.Mvc;
using SwasthyaHub.DTOs.Doctor;
using SwasthyaHub.Interfaces;
using System.Threading.Tasks;

namespace SwasthyaHub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorAuthController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public DoctorAuthController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        /// <summary>
        /// Register a new doctor.
        /// </summary>
        [HttpPost("registerDoctor")]
        public async Task<IActionResult> Register([FromBody] DoctorSignupDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var doctor = await _doctorService.AddDoctorAsync(dto);
            if (doctor == null)
                return BadRequest(new { message = "Username or Email already exists." });

            return Ok(new { message = "Doctor registered successfully." });
        }

        /// <summary>
        /// Login as doctor.
        /// </summary>
        [HttpPost("loginDoctor")]
        public async Task<IActionResult> Login([FromBody] DoctorLoginDto dto)
        {
            var response = await _doctorService.DoctorLoginAsync(dto);

            if (response == null)
                return Unauthorized(new { message = "Invalid username or password." });

            return Ok(response);
        }
    }
}
