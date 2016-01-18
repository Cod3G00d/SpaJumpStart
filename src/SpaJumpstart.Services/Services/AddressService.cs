using SpaJumpstart.Domain.Data.UnitOfWork;
using SpaJumpstart.Domain.Entities;
using SpaJumpstart.Domain.Services;

namespace SpaJumpstart.Services.Services
{
    public class AddressService : ServiceBase<Address>, IAddressService
    {
        public AddressService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}
