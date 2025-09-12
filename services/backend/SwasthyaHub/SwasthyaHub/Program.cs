using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SwasthyaHub.Data;
using SwasthyaHub.Interfaces;
using SwasthyaHub.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddScoped<IAuthService, AuthService>();

// Add Email Service
builder.Services.AddScoped<IEmailService, EmailService>();

// Add Password Reset Service
builder.Services.AddScoped<IPasswordResetService, PasswordResetService>();


// Register HospitalService
builder.Services.AddScoped<HospitalService>();


//doctor service
builder.Services.AddScoped<IDoctorService, DoctorService>();

//hospital
builder.Services.AddScoped<IHospitalService, HospitalService>();

//patient 
builder.Services.AddScoped<IPatientService, PatientService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

// FIXED: Uncommented authentication and ensured correct order
app.UseAuthentication();  // Must come before UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();
