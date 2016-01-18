using System;
using SpaJumpstart.Domain.Entities;

namespace SpaJumpstart.Common.Testing.Builders.Domain
{
    public class CustomerBuilder : Builder<CustomerBuilder, Customer>
    {
        int _customerId = 1;
        string _firstname = "Nick";
        string _surname = "Rhymes";
        string _telephone = "";
        string _mobilePhone = "0800070530";
        bool _active = true;
        DateTime _inceptionDate = DateTime.Now.AddDays(-7);
        string _applicationUserId = "xxxxxxxxxxxx";
        Address _address = AddressBuilder.Build.AnInstance();

        public override Customer AnInstance()
        {
            return new Customer {
                Id = _customerId,
                FirstName = _firstname,
                Surname = _surname,
                Telephone = _telephone,
                MobilePhone = _mobilePhone,
                Active = _active,
                InceptionDate = _inceptionDate,
                ApplicationUserId = _applicationUserId,
                Address = _address,
                //AddressId = _address.Id
            };
        }

        public CustomerBuilder Active(bool active)
        {
            _active = active;
            return this;
        }
        public CustomerBuilder WithCustomerId(int id)
        {
            _customerId = id;
            return this;
        }
        public CustomerBuilder WithFirstname(string firstname)
        {
            _firstname = firstname;
            return this;
        }
        public CustomerBuilder WithSurname(string surname)
        {
            _surname = surname;
            return this;
        }
        public CustomerBuilder WithTelephone(string telephone)
        {
            _telephone = telephone;
            return this;
        }
        public CustomerBuilder WithMobilePhone(string mobile)
        {
            _mobilePhone = mobile;
            return this;
        }
        public CustomerBuilder InceptionDate(DateTime inceptionDate)
        {
            _inceptionDate = inceptionDate;
            return this;
        }
        public CustomerBuilder ApplicationUserId(string appUserid)
        {
            _applicationUserId = appUserid;
            return this;
        }
        public CustomerBuilder Address(Address address)
        {
            _address = address;
            return this;
        }
    }
}
