using Microsoft.EntityFrameworkCore.Migrations;

namespace eFactory.Migrations
{
    public partial class AddContractor1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contractor",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContractorName = table.Column<string>(nullable: false),
                    MobileNumber = table.Column<long>(nullable: false),
                    status = table.Column<int>(nullable: false),
                    IsDelete = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contractor", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contractor");
        }
    }
}
