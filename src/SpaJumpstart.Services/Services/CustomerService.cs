using SpaJumpstart.Domain.Data.Repositories;
using SpaJumpstart.Domain.Data.UnitOfWork;
using SpaJumpstart.Domain.Entities;
using SpaJumpstart.Domain.Services;
using System.Threading.Tasks;

namespace SpaJumpstart.Services.Services
{
    public class CustomerService : ServiceBase<Customer>, ICustomerService
    {
        private IUnitOfWork _unitOfWork;

        //private readonly IRepositoryBase<Customer> _customerRepository;
        //private readonly IRepositoryBase<Address> _addressrRepository;

        private readonly ICustomerRepository _customerRepository;
        private readonly IAddressRepository _addressrRepository;

        public CustomerService(IUnitOfWork unitOfWork, ICustomerRepository customerRepo, IAddressRepository addressRepo)
            : base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            //_customerRepository = unitOfWork.Repository<Customer>();
            //_addressrRepository = unitOfWork.Repository<Address>();
            _customerRepository = customerRepo;
            _addressrRepository = addressRepo;
        }

        public async Task<Customer> AddCustomerAsync(Customer customer)
        {
            try
            {
                var address = customer.Address;
                //var customertToAdd = customer.Address = null;

                _customerRepository.Add(customer);

                address.Id = customer.Id;
               _addressrRepository.Add(address);

                _unitOfWork.Commit();
            }
            catch (System.Exception ex)
            {
                var error = ex;

                _unitOfWork.Rollback();
                throw;
            }

            return customer;
        }


    }
}
