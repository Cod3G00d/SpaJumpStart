using SpaJumpstart.Domain.Entities;
using System.Collections.Generic;

namespace SpaJumpstart.Common.Testing.Builders.Domain
{
    public class CustomerCollectionBuilder : Builder<CustomerCollectionBuilder, IEnumerable<Customer>>
    {
        private IList<Customer> _customers;

        public override IEnumerable<Customer> AnInstance()
        {
            if (_customers == null)
            {
                _customers = new List<Customer> { CustomerBuilder.Build.AnInstance() };
            }
            return _customers;
        }

        public CustomerCollectionBuilder Add(Customer customer)
        {
            if(_customers == null)
            {
                _customers = new List<Customer> { customer };
            }
            else
            {
                _customers.Add(customer);
            }
            return this;
        }
    }
}
