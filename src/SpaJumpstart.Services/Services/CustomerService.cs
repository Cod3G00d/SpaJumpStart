using SpaJumpstart.Domain.Data.UnitOfWork;
using SpaJumpstart.Domain.Entities;
using SpaJumpstart.Domain.Services;

namespace SpaJumpstart.Services.Services
{
    public class CustomerService : ServiceBase<Customer>, ICustomerService
    {
        public CustomerService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}
