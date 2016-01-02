namespace SpaJumpstart.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateInitial : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Customer", name: "ApplicationUser_Id", newName: "ApplicationUserId");
            RenameIndex(table: "dbo.Customer", name: "IX_ApplicationUser_Id", newName: "IX_ApplicationUserId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Customer", name: "IX_ApplicationUserId", newName: "IX_ApplicationUser_Id");
            RenameColumn(table: "dbo.Customer", name: "ApplicationUserId", newName: "ApplicationUser_Id");
        }
    }
}
