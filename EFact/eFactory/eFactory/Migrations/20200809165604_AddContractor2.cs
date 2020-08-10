using Microsoft.EntityFrameworkCore.Migrations;

namespace eFactory.Migrations
{
    public partial class AddContractor2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Email",
                table: "Contractor",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Contractor");
        }
    }
}
