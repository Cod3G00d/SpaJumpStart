using SpaJumpstart.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SpaJumpstart.Domain.Services
{
    public interface ICustomerService : IService<Customer>
    {
        Task<Customer> AddCustomerAsync(Customer customer);
    }
}
