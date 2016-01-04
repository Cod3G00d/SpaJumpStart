using SpaJumpstart.DataContracts.Dtos;
using System.Collections.Generic;

namespace SpaJumpstart.Common.Testing.Builders.Dto
{
    public class CustomerDtoCollectionBuilder : Builder<CustomerDtoCollectionBuilder, IEnumerable<CustomerDto>>
    {
        private IList<CustomerDto> _customersDto;

        public override IEnumerable<CustomerDto> AnInstance()
        {
            if (_customersDto == null)
            {
                _customersDto = new List<CustomerDto> { CustomerDtoBuilder.Build.AnInstance() };
            }
            return _customersDto;
        }

        public CustomerDtoCollectionBuilder Add(CustomerDto customerDto)
        {
            if (_customersDto == null)
            {
                _customersDto = new List<CustomerDto> { customerDto };
            }
            else
            {
                _customersDto.Add(customerDto);
            }
            return this;
        }
    }
}
