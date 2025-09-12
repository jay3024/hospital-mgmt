using Microsoft.AspNetCore.Mvc;
using SwasthyaHub.DTOs;
using SwasthyaHub.Interfaces;

namespace SwasthyaHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordResetController : ControllerBase
    {
        private readonly IPasswordResetService _passwordResetService;

        public PasswordResetController(IPasswordResetService passwordResetService)
        {
            _passwordResetService = passwordResetService;
        }

        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] ForgotPasswordDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _passwordResetService.SendOtpAsync(request);

            if (result.Success)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _passwordResetService.ResetPasswordAsync(request);

            if (result.Success)
                return Ok(result);

            return BadRequest(result);
        }

        // Removed verify-otp endpoint
    }
}
