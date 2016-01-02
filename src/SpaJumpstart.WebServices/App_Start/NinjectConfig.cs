//using SpaJumpstart.Domain.Entities;
//using SpaJumpstart.Services.Services;
//using System;
//using System.Reflection;
//using Ninject;
//using Ninject.Extensions.Conventions;
//using Ninject.Web.WebApi.Filter;
//using System.Web.Http.Validation;
//using SpaJumpstart.Domain.Services;
//using Ninject.Web.Common;
//using SpaJumpstart.Data.Context.EF;

//namespace SpaJumpstart.WebServices.App_Start
//{
//    public static class NinjectConfig
//    {
//        public static Lazy<IKernel> CreateKernel = new Lazy<IKernel>(() =>
//        {
//            StandardKernel kernel = new StandardKernel();
//            kernel.Load(Assembly.GetExecutingAssembly());

//            RegisterServices(kernel);

//            return kernel;
//        });

//        private static void RegisterServices(IKernel kernel)
//        {
//            // TODO - put in registrations here...

//            //kernel.Bind(q =>
//            //        q.FromAssembliesMatching("SpaJumpstart.WebServices*")
//            //        .SelectAllClasses()
//            //        .InheritedFrom(typeof(ServiceBase<Customer>))
//            //        .BindDefaultInterface()
//            //        .Configure(c => c.InSingletonScope()));

//            kernel.Bind<SpaDbContext>().To<SpaDbContext>().InRequestScope();
//            kernel.Bind<IService<Customer>>().To<ServiceBase<Customer>>().InRequestScope();
//            kernel.Bind<ICustomerService>().To<CustomerService>().InRequestScope();
//        }
//    }
//}