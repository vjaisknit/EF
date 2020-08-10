using Microsoft.EntityFrameworkCore.Migrations;

namespace eFactory.Migrations
{
    public partial class additemseriesAddIsdelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IsDelete",
                table: "ItemSeries",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "ItemSeries");
        }
    }
}
