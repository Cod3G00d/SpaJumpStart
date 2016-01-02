//using System;
//using System.Web;
//using Microsoft.Web.Infrastructure.DynamicModuleHelper;
//using Ninject;
//using Ninject.Extensions.Conventions;
//using Ninject.Web.Common;
//using SpaJumpstart.WebServices;
//using WebActivatorEx;
//using SpaJumpstart.Services.Services;
//using SpaJumpstart.Domain.Entities;

//[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(NinjectWebCommon), "Start")]
//[assembly: ApplicationShutdownMethod(typeof(NinjectWebCommon), "Stop")]

//namespace SpaJumpstart.WebServices
//{
//    public static class NinjectWebCommon
//    {
//        private static readonly Bootstrapper Bootstrapper = new Bootstrapper();

//        /// <summary>
//        /// Starts the application
//        /// </summary>
//        public static void Start()
//        {
//            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
//            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
//            Bootstrapper.Initialize(CreateKernel);
//        }

//        /// <summary>
//        /// Stops the application.
//        /// </summary>
//        public static void Stop()
//        {
//            Bootstrapper.ShutDown();
//        }

//        /// <summary>
//        /// Creates the kernel that will manage your application.
//        /// </summary>
//        /// <returns>The created kernel.</returns>
//        private static IKernel CreateKernel()
//        {
//            var kernel = new StandardKernel();
//            try
//            {
//                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
//                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

//                RegisterServices(kernel);
//                return kernel;
//            }
//            catch
//            {
//                kernel.Dispose();
//                throw;
//            }
//        }

//        /// <summary>
//        /// Load your modules or register your services here!
//        /// </summary>
//        /// <param name="kernel">The kernel.</param>
//        private static void RegisterServices(IKernel kernel)
//        {
//            kernel.Bind(q =>
//              q.FromAssembliesMatching("SpaJumpstart.WebServices*")
//              .SelectAllClasses()
//              .InheritedFrom(typeof(ServiceBase<Customer>))
//              .BindDefaultInterface()
//              .Configure(c => c.InSingletonScope()));
//        }
//    }
//}