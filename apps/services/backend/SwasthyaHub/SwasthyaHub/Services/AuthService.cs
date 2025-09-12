using Microsoft.EntityFrameworkCore;
using SwasthyaHub.Data;
using SwasthyaHub.DTOs.Patient;
using SwasthyaHub.Entities;
using SwasthyaHub.Helpers;
using SwasthyaHub.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;


public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(ApplicationDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    private async Task<string> GeneratePatientCode()
    {
        var lastPatientId = await _context.Patients.OrderByDescending(p => p.Id).FirstOrDefaultAsync();

        int nextNumber = lastPatientId != null ? lastPatientId.Id + 1 : 1;

        return $"SHP{nextNumber:D4}";


    }



    public async Task<bool> RegisterPatientAsync(PatientSignupDto dto)
    {

        string patientCode = await GeneratePatientCode();


        if (await _context.Patients.AnyAsync(u => u.Username == dto.Username))
            return false;

        CreatePasswordHash(dto.Password, out byte[] hash, out byte[] salt);




     

        var patient = new Patient
        {
            Username = dto.Username,

            Email = dto.Email,
            FullName = dto.FullName,
            AadhaarNumber = dto.AadhaarNumber, // ✅ Important: explicitly map this
            PhoneNumber = dto.PhoneNumber,
            Gender = dto.Gender,
            DateOfBirth = dto.DateOfBirth,
            AddressLine1 = dto.AddressLine1,
            AddressLine2 = dto.AddressLine2,
            City = dto.City,
            State = dto.State,
            Pincode = dto.Pincode,
            HeightInCm = dto.HeightInCm,
            WeightInKg = dto.WeightInKg,
            BloodGroup = dto.BloodGroup,
            KnownAllergies = dto.KnownAllergies,
            EmergencyContactName = dto.EmergencyContactName,
            EmergencyContactNumber = dto.EmergencyContactNumber,
            CreatedAt = dto.CreatedAt,
            PasswordHash = hash,
            PasswordSalt = salt,
             PatientCode = patientCode
        };

        _context.Patients.Add(patient);
        await _context.SaveChangesAsync();

        return true;
    }

    public async  Task<AuthResponseDto> LoginAsync(PatientLoginDto dto)
    {
        var patient = await _context.Patients.SingleOrDefaultAsync(x => x.Username == dto.Username);
        if (patient == null) return null;

        if (!VerifyPasswordHash(dto.Password, patient.PasswordHash, patient.PasswordSalt))
            return null;

        var token = JwtHelper.GenerateToken(patient.Username, _config["Jwt:Key"]);


        return new AuthResponseDto
        {
            Token = token,
            Username = patient.Username,
            Email = patient.Email
        };
    }



    private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
    {
        using var hmac = new HMACSHA512();
        salt = hmac.Key;
        hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
    }

    private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
    {
        using var hmac = new HMACSHA512(storedSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        return storedHash.SequenceEqual(computedHash);
    }


 
}
