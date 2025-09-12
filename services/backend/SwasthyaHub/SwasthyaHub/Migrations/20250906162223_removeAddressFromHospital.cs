using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SwasthyaHub.Migrations
{
    /// <inheritdoc />
    public partial class removeAddressFromHospital : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Hospitals");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Hospitals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
