using SpaJumpstart.DataContracts.Dtos;

namespace SpaJumpstart.Common.Testing.Builders.Dto
{
    public class AddressDtoBuilder : Builder<AddressDtoBuilder, AddressDto>
    {
        int _addressId = 1;
        string _addressLine1 = "101 The Manse";
        string _addressLine2 = "Alexandria";
        string _addressLine3 = "ZombieTown";
        string _addressLine4 = "ZombieLands";
        string _postcode = "ZLD 5LB";
        string _email = "RickRhymes@DeadRising.com";

        public override AddressDto AnInstance()
        {
            return new AddressDto
            {
                Id = _addressId,
                AddressLine1 = _addressLine1,
                AddressLine2 = _addressLine2,
                AddressLine3 = _addressLine3,
                AddressLine4 = _addressLine4,
                Postcode = _postcode,
                Email = _email
            };
        }
        public AddressDtoBuilder WithAddressid(int id)
        {
            _addressId = id;
            return this;
        }
        public AddressDtoBuilder WithAddressLine1(string addressLine1)
        {
            _addressLine1 = addressLine1;
            return this;
        }
        public AddressDtoBuilder WithAddressLine2(string addressLine2)
        {
            _addressLine2 = addressLine2;
            return this;
        }
        public AddressDtoBuilder WithAddressLine3(string addressLine3)
        {
            _addressLine3 = addressLine3;
            return this;
        }
        public AddressDtoBuilder WithAddressLine4(string addressLine4)
        {
            _addressLine4 = addressLine4;
            return this;
        }
        public AddressDtoBuilder WithPostcode(string postcode)
        {
            _postcode = postcode;
            return this;
        }
        public AddressDtoBuilder WithEmail(string email)
        {
            _email = email;
            return this;
        }
    }
}
