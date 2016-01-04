using SpaJumpstart.Domain.Entities;

namespace SpaJumpstart.Common.Testing.Builders.Domain
{
    public class AddressBuilder : Builder<AddressBuilder, Address>
    {
        int _addressId = 1;
        string _addressLine1 = "101 The Manse";
        string _addressLine2 = "Alexandria";
        string _addressLine3 = "ZombieTown";
        string _addressLine4 = "ZombieLands";
        string _postcode = "ZLD 5LB";
        string _email = "RickRhymes@DeadRising.com";

        public override Address AnInstance()
        {
            return new Address {
                Id = _addressId,
                AddressLine1 = _addressLine1,
                AddressLine2 = _addressLine2,
                AddressLine3 = _addressLine3,
                AddressLine4 = _addressLine4,
                Postcode = _postcode,
                Email = _email
            };
        }
        public AddressBuilder WithAddressid(int id)
        {
            _addressId = id;
            return this;
        }
        public AddressBuilder WithAddressLine1(string addressLine1)
        {
            _addressLine1 = addressLine1;
            return this;
        }
        public AddressBuilder WithAddressLine2(string addressLine2)
        {
            _addressLine2 = addressLine2;
            return this;
        }
        public AddressBuilder WithAddressLine3(string addressLine3)
        {
            _addressLine3 = addressLine3;
            return this;
        }
        public AddressBuilder WithAddressLine4(string addressLine4)
        {
            _addressLine4 = addressLine4;
            return this;
        }
        public AddressBuilder WithPostcode(string postcode)
        {
            _postcode = postcode;
            return this;
        }
        public AddressBuilder WithEmail(string email)
        {
            _email = email;
            return this;
        }
    }
}
