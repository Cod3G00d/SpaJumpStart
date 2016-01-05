﻿using SpaJumpstart.Domain.Services;
using SpaJumpstart.Domain.Entities;
using SpaJumpstart.Services.Services;

using Ninject.Modules;
using Ninject.Web.Common;
using Ninject.Extensions.Conventions;
using SpaJumpstart.WebServices.AssemblyReferences;

namespace SpaJumpstart.WebServices.IoC.Modules
{
    public class RegisterServices : NinjectModule
    {
        public override void Load()
        {

            //this.Load(ReferencedAssemblies.Services);

            //this.Bind(scanner => scanner.FromThisAssembly(ReferencedAssemblies.Services)
            //                                   .SelectAllClasses()
            //                                   .InheritedFrom<IService<Customer>>()
            //                                   .BindToAllInterfaces());

            this.Bind<IService<Customer>>().To<ServiceBase<Customer>>().InRequestScope();
            this.Bind<ICustomerService>().To<CustomerService>().InRequestScope();
        }
    }
}