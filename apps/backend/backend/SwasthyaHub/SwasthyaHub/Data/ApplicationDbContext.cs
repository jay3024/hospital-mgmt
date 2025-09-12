using Microsoft.EntityFrameworkCore;
using SwasthyaHub.Entities;
using System.Reflection.Emit;


namespace SwasthyaHub.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options ): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Patient>()
                .HasIndex(p => p.PatientCode)
                .IsUnique(); // ✅ This ensures uniqueness at the DB level


            //DoctorHopsital
            modelBuilder.Entity<DoctorHospital>()
                .HasKey(dh => new { dh.DoctorId, dh.HospitalId });

            modelBuilder.Entity<DoctorHospital>()
                .HasOne(dh => dh.Doctor)
                .WithMany()
                .HasForeignKey(dh => dh.DoctorId);

            modelBuilder.Entity<DoctorHospital>()
                .HasOne(dh => dh.Hospital)
                .WithMany()
                .HasForeignKey(dh => dh.HospitalId);

            
            //PatinetHospital
            modelBuilder.Entity<PatientHospital>()
            .HasKey(dh => new { dh.PatientId, dh.HospitalId });


            modelBuilder.Entity<PatientHospital>()
                .HasOne(dh => dh.Patient)
                .WithMany()
                .HasForeignKey(dh => dh.PatientId);

            modelBuilder.Entity<PatientHospital>()
                .HasOne(dh => dh.Hospital)
                .WithMany()
                .HasForeignKey(dh => dh.HospitalId);



        }


        public DbSet<Patient> Patients { get; set; } //this will create a Patients table in the database

        public DbSet<Doctor> Doctors { get; set; } //this will create a Doctors table in the database

        public DbSet<OtpRecord> OtpRecords { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<DoctorHospital> DoctorHospital { get; set; }
        public DbSet<PatientHospital> PatientHospital { get; set; }

    }
}
