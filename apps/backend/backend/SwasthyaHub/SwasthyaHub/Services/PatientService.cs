using SwasthyaHub.Data;
using SwasthyaHub.Entities;
using Microsoft.EntityFrameworkCore;
using SwasthyaHub.DTOs.Patient;


public class PatientService : IPatientService
{
    private readonly ApplicationDbContext _context;

    public PatientService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PatientResponseDto>> GetAllPatientsAsync()
    {
        return await _context.Patients
            .Select(p => new PatientResponseDto
            {
                Id = p.Id,
                FullName = p.FullName,
                Email = p.Email,
                Username = p.Username,
                PhoneNumber = p.PhoneNumber,
                Gender = p.Gender,
                DateOfBirth = p.DateOfBirth,
                AadhaarNumber = p.AadhaarNumber,
                AddressLine1 = p.AddressLine1,
                AddressLine2 = p.AddressLine2,
                City = p.City,
                State = p.State,
                Pincode = p.Pincode,
                HeightInCm = p.HeightInCm,
                WeightInKg = p.WeightInKg,
                BloodGroup = p.BloodGroup,
                KnownAllergies = p.KnownAllergies,
                EmergencyContactName = p.EmergencyContactName,
                EmergencyContactNumber = p.EmergencyContactNumber,
                CreatedAt = p.CreatedAt,
               
            })
            .ToListAsync();
    }

    public async Task<PatientResponseDto> GetPatientByIdAsync(int id)
    {
        var p = await _context.Patients.FindAsync(id);
        if (p == null) return null;

        return new PatientResponseDto
        {
            Id = p.Id,
            FullName = p.FullName,
            Email = p.Email,
            Username = p.Username,
            PhoneNumber = p.PhoneNumber,
            Gender = p.Gender,
            DateOfBirth = p.DateOfBirth,
            AadhaarNumber = p.AadhaarNumber,
            AddressLine1 = p.AddressLine1,
            AddressLine2 = p.AddressLine2,
            City = p.City,
            State = p.State,
            Pincode = p.Pincode,
            HeightInCm = p.HeightInCm,
            WeightInKg = p.WeightInKg,
            BloodGroup = p.BloodGroup,
            KnownAllergies = p.KnownAllergies,
            EmergencyContactName = p.EmergencyContactName,
            EmergencyContactNumber = p.EmergencyContactNumber,
            CreatedAt = p.CreatedAt,
         
        };
    }

 

    public async Task<PatientResponseDto> UpdatePatientAsync(int id, PatientUpdateDto dto)
    {
        var p = await _context.Patients.FindAsync(id);
        if (p == null) return null;

        p.FullName = dto.FullName;
        p.PhoneNumber = dto.PhoneNumber;
        p.Gender = dto.Gender;
        p.DateOfBirth = dto.DateOfBirth;
        p.AadhaarNumber = dto.AadhaarNumber;
        p.AddressLine1 = dto.AddressLine1;
        p.AddressLine2 = dto.AddressLine2;
        p.City = dto.City;
        p.State = dto.State;
        p.Pincode = dto.Pincode;
        p.HeightInCm = dto.HeightInCm;
        p.WeightInKg = dto.WeightInKg;
        p.BloodGroup = dto.BloodGroup;
        p.KnownAllergies = dto.KnownAllergies;
        p.EmergencyContactName = dto.EmergencyContactName;
        p.EmergencyContactNumber = dto.EmergencyContactNumber;
  

        await _context.SaveChangesAsync();

        return await GetPatientByIdAsync(p.Id);
    }

    public async Task<bool> DeletePatientAsync(int id)
    {
        var p = await _context.Patients.FindAsync(id);
        if (p == null) return false;

        _context.Patients.Remove(p);
        await _context.SaveChangesAsync();
        return true;
    }

    //get patients by filter
    public async Task<IEnumerable<PatientResponseDto>> GetPatientsAsync(PatientFilterDto filter)
    {
        IQueryable<Patient> query;

        // Case 1: All linked patients
        if (filter.ShowAll && filter.HospitalId == 0)
        {
            query = from p in _context.Patients
                    join ph in _context.PatientHospital on p.Id equals ph.PatientId
                    select p;
        }
        // Case 2: Linked patients by hospital
        else if (filter.ShowAll && filter.HospitalId > 0)
        {
            query = from p in _context.Patients
                    join ph in _context.PatientHospital on p.Id equals ph.PatientId
                    where ph.HospitalId == filter.HospitalId
                    select p;
        }
        // Case 3: Not linked patients
        else
        {
            query = _context.Patients
                .Where(p => !_context.PatientHospital
                    .Any(ph => ph.PatientId == p.Id));
        }

        return await query
            .Select(p => new PatientResponseDto
            {
                Id = p.Id,
                FullName = p.FullName,
                Email = p.Email,
                PhoneNumber = p.PhoneNumber,
                AadhaarNumber = p.AadhaarNumber,
                Gender = p.Gender,
                DateOfBirth = p.DateOfBirth
            })
            .ToListAsync();
    }



}
