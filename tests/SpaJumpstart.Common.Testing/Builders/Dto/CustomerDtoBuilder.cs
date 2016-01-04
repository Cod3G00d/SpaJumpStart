using SpaJumpstart.DataContracts.Dtos;
using System;

namespace SpaJumpstart.Common.Testing.Builders.Dto
{
    public class CustomerDtoBuilder : Builder<CustomerDtoBuilder, CustomerDto>
    {
        int _customerId = 1;
        string _firstname = "Nick";
        string _surname = "Rhymes";
        string _telephone = "";
        string _mobilePhone = "0800070530";
        bool _active = true;
        AddressDto _addressDto = AddressDtoBuilder.Build.AnInstance();

        public override CustomerDto AnInstance()
        {
            return new CustomerDto
            {
                Id  = _customerId,
                FirstName = _firstname,
                Surname = _surname,
                Telephone = _telephone,
                MobilePhone = _mobilePhone,
                Active = _active,
                Address = _addressDto
            };
        }

        public CustomerDtoBuilder Active(bool active)
        {
            _active = active;
            return this;
        }
        public CustomerDtoBuilder CustomerId(int id)
        {
            _customerId = id;
            return this;
        }
        public CustomerDtoBuilder WithFirstname(string firstname)
        {
            _firstname = firstname;
            return this;
        }
        public CustomerDtoBuilder WithSurname(string surname)
        {
            _surname = surname;
            return this;
        }
        public CustomerDtoBuilder WithTelephone(string telephone)
        {
            _telephone = telephone;
            return this;
        }
        public CustomerDtoBuilder WithMobilePhone(string mobile)
        {
            _mobilePhone = mobile;
            return this;
        }
        public CustomerDtoBuilder AddressDto(AddressDto addressDto)
        {
            _addressDto = addressDto;
            return this;
        }
    }
}
