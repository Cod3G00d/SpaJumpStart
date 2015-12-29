using SpaJumpstart.Domain.Data.Repositories;
using SpaJumpstart.Domain.Entities;

namespace SpaJumpstart.Data.Extensions
{
    public static class CustomerExtensions
    {
        public static async System.Threading.Tasks.Task<string> GetCustomerFullNameAsync(this IRepositoryBase<Customer> customersRepository, int customerId)
        {
            string _customerName = string.Empty;

            var _customer = await customersRepository.GetByIdAsync(customerId);

            _customerName = _customer.FirstName + " " + _customer.Surname;

            return _customerName;
        }

        public static string GetCustomerFullName(this IRepositoryBase<Customer> customersRepository, int customerId)
        {
            string _customerName = string.Empty;

            var _customer = customersRepository.GetById(customerId);

            _customerName = _customer.FirstName + " " + _customer.Surname;

            return _customerName;
        }
    }
}
