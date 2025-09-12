using Microsoft.EntityFrameworkCore;
using SwasthyaHub.Data;
using SwasthyaHub.DTOs.Hospital;
using SwasthyaHub.Entities;
using SwasthyaHub.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwasthyaHub.Services
{
    public class HospitalService : IHospitalService
    {
        private readonly ApplicationDbContext _context;

        public HospitalService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<HospitalResponseDto> AddHospitalAsync(HospitalCreateDto dto)
        {
            var hospital = new Hospital
            {
                Name = dto.Name,
                Phone = dto.Phone,
                Email = dto.Email,
                LicenseNumber = dto.LicenseNumber,
                City = dto.City,
                State = dto.State,
                PinCode = dto.PinCode,
                ContactNumber = dto.ContactNumber,
                AddressLine1 = dto.AddressLine1,
                AddressLine2 = dto.AddressLine2,
                Status = Enum.TryParse<HospitalStatus>(dto.Status, true, out var parsedStatus)
                    ? parsedStatus
                    : HospitalStatus.Active // default if parsing fails
            };

            _context.Hospitals.Add(hospital);
            await _context.SaveChangesAsync();

            return new HospitalResponseDto
            {
                Id = hospital.Id,
                Name = hospital.Name,
                Phone = hospital.Phone,
                Email = hospital.Email,
                LicenseNumber = hospital.LicenseNumber,
                City = hospital.City,
                State = hospital.State,
                PinCode = hospital.PinCode,
                ContactNumber = hospital.ContactNumber,
                AddressLine1 = hospital.AddressLine1,
                AddressLine2 = hospital.AddressLine2,
                Status = hospital.Status.ToString(),
                CreatedAt = hospital.CreatedAt
            };
        }

        public async Task<HospitalResponseDto> UpdateHospitalAsync(HospitalUpdateDto dto)
        {
            var hospital = await _context.Hospitals.FindAsync(dto.Id);
            if (hospital == null) return null;

            hospital.Name = dto.Name ?? hospital.Name;
            hospital.Phone = dto.Phone ?? hospital.Phone;
            hospital.Email = dto.Email ?? hospital.Email;
            hospital.LicenseNumber = dto.LicenseNumber ?? hospital.LicenseNumber;
            hospital.City = dto.City ?? hospital.City;
            hospital.State = dto.State ?? hospital.State;
          
            hospital.PinCode = dto.PinCode ?? hospital.PinCode;
            hospital.ContactNumber = dto.ContactNumber ?? hospital.ContactNumber;
            hospital.AddressLine1 = dto.AddressLine1 ?? hospital.AddressLine1;
            hospital.AddressLine2 = dto.AddressLine2 ?? hospital.AddressLine2;
            // ✅ Convert string to enum safely
            if (!string.IsNullOrWhiteSpace(dto.Status) &&
                Enum.TryParse<HospitalStatus>(dto.Status, true, out var parsedStatus))
            {
                hospital.Status = parsedStatus;
            }
            hospital.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return new HospitalResponseDto
            {
                Id = hospital.Id,
                Name = hospital.Name,
                Phone = hospital.Phone,
                Email = hospital.Email,
                LicenseNumber = hospital.LicenseNumber,
                City = hospital.City,
                State = hospital.State,
                PinCode = hospital.PinCode,
                ContactNumber = hospital.ContactNumber,
                AddressLine1 = hospital.AddressLine1,
                AddressLine2 = hospital.AddressLine2,
                Status = hospital.Status.ToString(),
                CreatedAt = hospital.CreatedAt
            };
        }

        public async Task<bool> DeleteHospitalAsync(int id)
        {
            var hospital = await _context.Hospitals.FindAsync(id);
            if (hospital == null) return false;

            _context.Hospitals.Remove(hospital);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<HospitalResponseDto> GetHospitalByIdAsync(int id)
        {
            var hospital = await _context.Hospitals.FindAsync(id);
            if (hospital == null) return null;

            return new HospitalResponseDto
            {
                Id = hospital.Id,
                Name = hospital.Name,
                Phone = hospital.Phone,
                Email = hospital.Email,
                LicenseNumber = hospital.LicenseNumber,
                City = hospital.City,
                State = hospital.State,
                PinCode = hospital.PinCode,
                ContactNumber = hospital.ContactNumber,
                AddressLine1 = hospital.AddressLine1,
                AddressLine2 = hospital.AddressLine2,
                Status = hospital.Status.ToString(),
                CreatedAt = hospital.CreatedAt
            };
        }

        public async Task<IEnumerable<HospitalResponseDto>> GetAllHospitalsAsync()
        {
            return await _context.Hospitals
                .Select(h => new HospitalResponseDto
                {
                    Id = h.Id,
                    Name = h.Name,
                    Phone = h.Phone,
                    Email = h.Email,
                    LicenseNumber = h.LicenseNumber,
                    City = h.City,
                    State = h.State,
                    PinCode = h.PinCode,
                    ContactNumber = h.ContactNumber,
                    AddressLine1 = h.AddressLine1,
                    AddressLine2 = h.AddressLine2,
                    Status = h.Status.ToString(),
                    CreatedAt = h.CreatedAt
                }).ToListAsync();
        }
    }
}
