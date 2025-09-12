using SwasthyaHub.DTOs.Doctor;

namespace SwasthyaHub.DTOs
{
    public class GetDoctorsByHospitalIdDto
    {
        public Guid HospitalId { get; set; }   // Which hospital the doctors belong to
        public IEnumerable<GetAllDoctorsDto> Doctors { get; set; } = Enumerable.Empty<GetAllDoctorsDto>();

        // Optional metadata (remove if not needed)
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages
        {
            get
            {
                if (PageSize == 0) return 0;
                return (int)Math.Ceiling((double)TotalCount / PageSize);
            }
        }
    }
}
