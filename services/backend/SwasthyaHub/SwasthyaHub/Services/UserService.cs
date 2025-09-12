using Microsoft.EntityFrameworkCore;
using SwasthyaHub.Data;
using SwasthyaHub.Entities;
using System.Security.Cryptography;
using System.Text;

namespace SwasthyaHub.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create a new user
        public async Task<User> CreateUserAsync(
            string email,
            string password,
            string name,
            string phone,
            UserRole role,
            int? linkedId = null,
            string govtId = null)
        {
            // Check if email already exists
            if (await _context.Users.AnyAsync(u => u.Email == email))
                throw new Exception("Email already exists");

            var passwordHash = HashPassword(password);

            var user = new User
            {
                Email = email,
                PasswordHash = passwordHash,
                Name = name,
                Phone = phone,
                Role = role,
                LinkedId = linkedId,
                GovtId = govtId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        // Get user by email
        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        // Authenticate (login) user
        public async Task<User?> AuthenticateUserAsync(string email, string password)
        {
            var user = await GetUserByEmailAsync(email);
            if (user == null)
                return null; // Email not found

            if (!VerifyPassword(password, user.PasswordHash))
                return null; // Wrong password

            return user; // Login success
        }

        // Verify password
        public bool VerifyPassword(string password, string storedHash)
        {
            var computedHash = HashPassword(password);
            return storedHash == computedHash;
        }

        // Hash password
        private string HashPassword(string password)
        {
            using var sha512 = SHA512.Create();
            var hashBytes = sha512.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashBytes);
        }
    }
}
