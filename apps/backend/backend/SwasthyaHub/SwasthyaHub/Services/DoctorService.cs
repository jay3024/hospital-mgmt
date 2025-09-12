// Services/DoctorService.cs
using Microsoft.EntityFrameworkCore;
using SwasthyaHub.Data;
using SwasthyaHub.DTOs.Doctor;
using SwasthyaHub.Entities;
using SwasthyaHub.Helpers;
using SwasthyaHub.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;


namespace SwasthyaHub.Services
{
    public class DoctorService : IDoctorService



    {

        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public DoctorService(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }




        public DoctorService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DoctorResponseDto> AddDoctorAsync(DoctorSignupDto dto)

        {


            CreatePasswordHash(dto.Password, out byte[] hash, out byte[] salt);


            string doctorCode = await GenerateDoctorCode();


            var doctor = new Doctor
            {
                FullName = dto.FullName,
                Specialization = dto.Specialization,
                HospitalId = dto.HospitalId,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,

                // Add these missing fields
                AadhaarNumber = dto.AadhaarNumber,
                Username = dto.Username,
            
                Gender = dto.Gender,
                DateOfBirth = dto.DateOfBirth,
                RegistrationNumber = dto.RegistrationNumber,
                Qualifications = dto.Qualifications,
                YearsOfExperience = dto.YearsOfExperience,
                ClinicAddress = dto.ClinicAddress,
                AddressLine1 = dto.AddressLine1,
                AddressLine2 = dto.AddressLine2,
                City = dto.City,
                State = dto.State,
                Pincode = dto.Pincode,
                EmergencyContactName = dto.EmergencyContactName,
                EmergencyContactNumber = dto.EmergencyContactNumber,
                CreatedAt = dto.CreatedAt,
                 PasswordHash = hash,
                PasswordSalt = salt,
                DoctorCode = doctorCode
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return new DoctorResponseDto
            {
                Id = doctor.Id,
                FullName = doctor.FullName,
                Specialization = doctor.Specialization,
                HospitalId = doctor.HospitalId,
                PhoneNumber = doctor.PhoneNumber,
                Email = doctor.Email,
                AadhaarNumber = doctor.AadhaarNumber,
                RegistrationNumber = doctor.RegistrationNumber
                // include other response fields if needed
            };
        }

        private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using var hmac = new HMACSHA512();
            salt = hmac.Key;
            hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        private async Task<string> GenerateDoctorCode()
        {
            var lastDoctorId = await _context.Doctors.OrderByDescending(d => d.Id).FirstOrDefaultAsync();

            int nextNumber = lastDoctorId != null ? lastDoctorId.Id + 1 : 1;

            return $"SHD{nextNumber:D4}";


        }


        public async Task<DoctorResponseDto> UpdateDoctorAsync(UpdateDoctorDto dto)
        {
            var doctor = await _context.Doctors.FindAsync(dto.Id);
            if (doctor == null) return null;

            doctor.FullName = dto.FullName;
            doctor.Specialization = dto.Specialization;
            doctor.HospitalId = dto.HospitalId;
            doctor.PhoneNumber = dto.PhoneNumber;
            doctor.Email = dto.Email;

            await _context.SaveChangesAsync();

            return new DoctorResponseDto
            {
                Id = doctor.Id,
                FullName = doctor.FullName,
                Specialization = doctor.Specialization,
                HospitalId = doctor.HospitalId,
                PhoneNumber = doctor.PhoneNumber,
                Email = doctor.Email
            };
        }

        public async Task<DoctorResponseDto> GetDoctorByIdAsync(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null) return null;

            return new DoctorResponseDto
            {
                Id = doctor.Id,
                FullName = doctor.FullName,
                Specialization = doctor.Specialization,
                HospitalId = doctor.HospitalId,
                PhoneNumber = doctor.PhoneNumber,
                Email = doctor.Email
            };
        }

        public async Task<IEnumerable<DoctorResponseDto>> GetAllDoctorsAsync()
        {
            return await _context.Doctors
                .Select(d => new DoctorResponseDto
                {
                    Id = d.Id,
                    HospitalId = d.HospitalId,
                    FullName = d.FullName,
                    Email = d.Email,
                    Username = d.Username,
                    PhoneNumber = d.PhoneNumber,
                    Gender = d.Gender,
                    DateOfBirth = d.DateOfBirth,
                    AadhaarNumber = d.AadhaarNumber,
                    RegistrationNumber = d.RegistrationNumber,
                    Specialization = d.Specialization,
                    Qualifications = d.Qualifications,
                    YearsOfExperience = d.YearsOfExperience,
                    ClinicAddress = d.ClinicAddress,
                    AddressLine1 = d.AddressLine1,
                    AddressLine2 = d.AddressLine2,
                    City = d.City,
                    State = d.State,
                    Pincode = d.Pincode,
                    EmergencyContactName = d.EmergencyContactName,
                    EmergencyContactNumber = d.EmergencyContactNumber,
                    CreatedAt = d.CreatedAt,
                   
                })
                .ToListAsync();
        }


        public async Task<IEnumerable<DoctorResponseDto>> GetDoctorsByHospitalIdAsync(int hospitalId)
        {
            return await _context.Doctors
                .Where(d => d.HospitalId == hospitalId)
                .Select(d => new DoctorResponseDto
                {
                    Id = d.Id,
                    FullName = d.FullName,
                    Specialization = d.Specialization,
                    HospitalId = d.HospitalId,
                    PhoneNumber = d.PhoneNumber,
                    Email = d.Email
                })
                .ToListAsync();
        }

        // Doctor Login method
        public async Task<DoctorAuthResponseDto> DoctorLoginAsync(DoctorLoginDto dto)
        {
            var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Username == dto.Username);
            if (!VerifyPasswordHash(dto.Password, doctor.PasswordHash, doctor.PasswordSalt))

                throw new UnauthorizedAccessException("Invalid credentials");

            var token = JwtHelper.GenerateToken(doctor.Username, _config["Jwt:Key"]);

            return new DoctorAuthResponseDto
            {
                Token = token,
                Username = doctor.Username,
                Email = doctor.Email
            };
        }


        // Password verification helper
        private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            using var hmac = new HMACSHA512(storedSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return storedHash.SequenceEqual(computedHash);
        }
    }
}
