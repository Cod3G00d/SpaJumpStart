using SpaJumpstart.Data.Context.EF;
using SpaJumpstart.Domain.Data.Repositories;
using SpaJumpstart.Domain.Entities;

namespace SpaJumpstart.Data.Repositories
{
    public class AddressRepository : RepositoryBase<Address>, IAddressRepository
    {
        public AddressRepository(IDbContext context) : base (context)
        {
        }
    }
}
