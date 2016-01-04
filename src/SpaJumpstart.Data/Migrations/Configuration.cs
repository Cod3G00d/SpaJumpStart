namespace SpaJumpstart.Data.Migrations
{
    using Context.EF;
    using Domain.Entities;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<SpaDbContext>
    {
        List<Customer> defaultCustomers = new List<Customer>();

        List<Address> defaultAdresses = new List<Address>();

        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "SpaDbContext";
        }

        protected override void Seed(SpaDbContext context)
        {
            AddCustomers();

            foreach (Customer customer in defaultCustomers)
                context.Customers.AddOrUpdate(customer);

            base.Seed(context);
        }

        private void AddCustomers()
        {


            //defaultAdresses.Add(new Address
            //{
            //    //Id = 1,
            //    AddressLine1 = "101 The Manse",
            //    AddressLine2 = "Alexandria",
            //    AddressLine4 = "ZombieLands",
            //    Postcode = "ZLD 5LB"
            //});

            defaultCustomers.Add(new Customer
            {
                Id = 1,
                FirstName = "Nick",
                Surname = "Rhymes",
                InceptionDate = DateTime.Now,
                Active = true,
                MobilePhone = "0800070530",
                AddressId = 1,
                Address = new Address
                {
                    Id = 1,
                    AddressLine1 = "101 The Manse",
                    AddressLine2 = "Alexandria",
                    AddressLine3 = "ZombieTown",
                    AddressLine4 = "ZombieLands",
                    Postcode = "ZLD 5LB",
                    Email = "RickGrimes@DeadRising.com"
                },
                ApplicationUserId = "7212d527-d99e-4fc2-8a9f-1f342ce11e2f"

            });
        }
    }
}
