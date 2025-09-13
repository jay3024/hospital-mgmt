using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SwasthyaHub.Migrations
{
    /// <inheritdoc />
    public partial class PasswordHashSaltHopsitalMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Hospitals",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Hospitals",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Hospitals");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Hospitals");
        }
    }
}
