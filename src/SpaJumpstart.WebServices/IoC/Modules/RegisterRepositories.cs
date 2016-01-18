using SpaJumpstart.Domain.Entities;
using SpaJumpstart.Domain.Data.Repositories;
using SpaJumpstart.Data.Repositories;

using Ninject.Modules;
using Ninject.Web.Common;

namespace SpaJumpstart.WebServices.IoC.Modules
{
    public class RegisterRepositories : NinjectModule
    {
        public override void Load()
        {
            this.Bind<IRepositoryBase<EntityBase>>().To<RepositoryBase<EntityBase>>().InRequestScope();
            this.Bind<ICustomerRepository>().To<CustomerRepository>().InRequestScope();
            this.Bind<IAddressRepository>().To<AddressRepository>().InRequestScope();
        }
    }
}