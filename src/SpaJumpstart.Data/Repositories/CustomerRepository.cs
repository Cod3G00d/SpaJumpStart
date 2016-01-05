using SpaJumpstart.Data.Context.EF;
using SpaJumpstart.Domain.Data.Repositories;
using SpaJumpstart.Domain.Entities;

namespace SpaJumpstart.Data.Repositories
{
    public class CustomerRepository : RepositoryBase<Customer>, ICustomerRepository
    {
        public CustomerRepository(IDbContext context) : base (context)
        {
        }
    }
}
