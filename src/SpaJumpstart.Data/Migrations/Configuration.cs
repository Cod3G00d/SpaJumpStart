namespace SpaJumpstart.Data.Migrations
{
    using Context.EF;
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<SpaDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "SpaDbContext";
        }

        protected override void Seed(SpaDbContext context)
        {
            base.Seed(context);
        }
    }
}
