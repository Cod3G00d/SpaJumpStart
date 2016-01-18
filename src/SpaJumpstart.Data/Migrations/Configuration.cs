namespace SpaJumpstart.Data.Migrations
{
    using Domain.Entities;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SpaJumpstart.Data.Context.EF.SpaDbContext>
    {
        private bool pendingMigrationsExist;

        string _addressLine1 = "101 The Manse";
        string _addressLine2 = "Alexandria";
        string _addressLine3 = "ZombieTown";
        string _addressLine4 = "ZombieLands";
        string _postcode = "ZLD 5LB";
        string _email = "NickRhymes@DeadRising.com";

        int _customerId = 1;
        string _firstname = "Nick";
        string _surname = "Rhymes";
        string _telephone = "";
        string _mobilePhone = "0800070530";
        bool _active = true;
        DateTime _inceptionDate = DateTime.Now.AddDays(-7);

        string _applicationUserId;

        public Configuration()
        {
            AutomaticMigrationsEnabled = false;

            // This is required to detect changes.
            var dbMigrator = new DbMigrator(this);

            // This is required to detect changes.
            pendingMigrationsExist = dbMigrator.GetPendingMigrations().Any();

            if (pendingMigrationsExist)
            {
                dbMigrator.Update();
            }

        }

        protected override void Seed(SpaJumpstart.Data.Context.EF.SpaDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            InitializeDefaultLoginUser(context);
            CreateDefaultCustomer(context);
        }

        public void InitializeDefaultLoginUser(SpaJumpstart.Data.Context.EF.SpaDbContext context)
        {
            string userId = "xxxxxxxxxx";
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
                    _applicationUserId = user.Id;
                }

                //context.Commit();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void CreateDefaultCustomer(Context.EF.SpaDbContext context)
        {
            try
            {
                var newAddress = new Address
                {
                    //Id = _customerId,
                    AddressLine1 = _addressLine1,
                    AddressLine2 = _addressLine2,
                    AddressLine3 = _addressLine3,
                    AddressLine4 = _addressLine4,
                    Postcode = _postcode,
                    Email = _email
                };

                var newcustomer = new Customer
                {
                    //Id = _customerId,
                    FirstName = _firstname,
                    Surname = _surname,
                    Telephone = _telephone,
                    MobilePhone = _mobilePhone,
                    Active = _active,
                    InceptionDate = _inceptionDate,
                    ApplicationUserId = _applicationUserId,
                    Address = newAddress,

                };

                IList<Customer> defaultCustomers = new List<Customer>();
                defaultCustomers.Add(newcustomer);

                foreach (Customer customer in defaultCustomers)
                    context.Customers.AddOrUpdate(customer);

                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
