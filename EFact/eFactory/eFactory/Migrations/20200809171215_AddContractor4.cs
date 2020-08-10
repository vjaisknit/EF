using Microsoft.EntityFrameworkCore.Migrations;

namespace eFactory.Migrations
{
    public partial class AddContractor4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Contractor",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Email",
                table: "Contractor",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
