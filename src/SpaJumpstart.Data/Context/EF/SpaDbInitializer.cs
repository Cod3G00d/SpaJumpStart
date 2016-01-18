using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using SpaJumpstart.Domain.Entities;
using System;
using System.Data.Entity;

namespace SpaJumpstart.Data.Context.EF
{
    public class SpaDbInitializer : DropCreateDatabaseIfModelChanges<SpaDbContext>
    {

        protected override void Seed(SpaDbContext context)
        {
            base.Seed(context);

            Initialize(context);

        }

        public void Initialize(SpaDbContext context)
        {
            try
            {
                var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
                userManager.UserValidator = new UserValidator<ApplicationUser>(userManager)
                {
                    AllowOnlyAlphanumericUserNames = false
                };
                var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));

                if (!roleManager.RoleExists("Admin"))
                {
                    roleManager.Create(new IdentityRole("Admin"));
                }

                if (!roleManager.RoleExists("Member"))
                {
                    roleManager.Create(new IdentityRole("Member"));
                }

                var user = new ApplicationUser()
                {
                    Email = "testuser@testuser.com",
                    UserName = "test@test.com",
                    FirstName = "Spa",
                    Surname = "Developer"
                };

                var userResult = userManager.Create(user, "Admin@123");

                if (userResult.Succeeded)
                {
                    userManager.AddToRole<ApplicationUser, string>(user.Id, "Admin");
                }

                context.Commit();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
