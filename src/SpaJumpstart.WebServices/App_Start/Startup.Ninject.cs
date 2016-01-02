//using Ninject;
//using Ninject.Web.Common.OwinHost;
//using Ninject.Web.WebApi.OwinHost;
//using Owin;
//using System.Reflection;
//using System.Web.Http;

//namespace SpaJumpstart.WebServices.App_Start
//{
//    public partial class Startup
//    {
//        public IKernel ConfigureNinject(IAppBuilder app)
//        {
//            var config = new HttpConfiguration();
//            var kernel = CreateKernel();
//            app.UseNinjectMiddleware(() => kernel)
//               .UseNinjectWebApi(config);

//            return kernel;
//        }

//        public IKernel CreateKernel()
//        {
//            var kernel = new StandardKernel();
//            kernel.Load(Assembly.GetExecutingAssembly());
//            return kernel;
//        }
//    }
//}