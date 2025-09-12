using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwasthyaHub.DTOs.Patient;
using SwasthyaHub.Interfaces;
using static AuthService;

namespace SwasthyaHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("patientRegister")]
        public async Task<IActionResult> PatientRegister(PatientSignupDto dto)
        {
            var result = await _authService.RegisterPatientAsync(dto);


            if (!result) return BadRequest("Username already exists.");
            return Ok("Registration successful");
        }

        [HttpPost("patientLogin")]
        public async Task<IActionResult> PatientLogin(PatientLoginDto dto)
        {
            
           if(dto!= null) { } 
            var result = await _authService.LoginAsync(dto);
            
            if (result == null) return Unauthorized(new { message = "Invalid credentials" });
            ;


            return Ok(result);

           
        }




    }
}
