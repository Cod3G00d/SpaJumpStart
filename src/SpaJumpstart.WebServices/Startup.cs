using Antlr.Runtime.Misc;
using Microsoft.Owin;
using Ninject;
using Ninject.Web.Common;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;
using SpaJumpstart.Data.Context.EF;
using SpaJumpstart.Data.UnitOfWork;
using SpaJumpstart.Domain.Data.UnitOfWork;

using SpaJumpstart.WebServices.IoC.Modules;
using SpaJumpstart.WebServices.Mappings.AutoMappings;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;


/*
    Assembly attribute ensures we start the correct class when the server starts
    IAppBuilder parameter is an 
*/

[assembly: OwinStartup(typeof(SpaJumpstart.WebServices.Startup))]

namespace SpaJumpstart.WebServices
{
    public partial class Startup
    {
        /// <summary>
        /// Application Configuration for the Owin Server
        /// </summary>
        /// <param name="app">IAppBuilder Interface used to compose the application for the Owin Server</param>
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            ConfigureCors(app);

            //Register mapping definitions for Automapper

            var mappingDefinitions = new MappedDefinitions();
            mappingDefinitions.Init();


            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AreaRegistration.RegisterAllAreas();

            /*
            HttpConfiguration used to configure API routes, so we pass to the "WebAPIConfig" template class.
            */

            var httpConfig = new HttpConfiguration();
            httpConfig.MapHttpAttributeRoutes();

            var kernel = CreateKernel();
            //var httpResolver = new NinjectHttpDependencyResolver(kernel);
            //httpConfig.DependencyResolver = httpResolver;

            app.UseNinjectMiddleware(() => kernel)
               .UseNinjectWebApi(httpConfig);

            //ConfigureAuth(app);

            WebApiConfig.Register(httpConfig);

            /*
            We pass the config to the UseWebAPI extension method, which is responsible for wiring up the Web API to our Owin Server Pipeline
            N.B once wire we dont need the Global.Asax class so it can be deleted.
            */

            app.UseWebApi(httpConfig);

        }

        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

                //kernel.Load(Assembly.GetExecutingAssembly());

                Register(kernel);
                return kernel;
            }
            catch (System.Exception)
            {
                kernel.Dispose();
                throw;
            }
        }
        // http://social.gseosem.com/resolving-dependencies-in-owin-web-api-startup-cs-with-ninject/
        private static void Register(IKernel kernel)
        {

            kernel.Bind<IUnitOfWork>().To<UnitOfWork>().InRequestScope();

            //kernel.Bind<ILogger>().To<Logger>().InSingletonScope

            const string nameOrConnectionString = "name=SpaAppDbConnection";
            kernel.Bind<IDbContext>().To<SpaDbContext>().InRequestScope().WithConstructorArgument("nameOrConnectionString", nameOrConnectionString);

            kernel.Load<RegisterServices>();
            kernel.Load<RegisterAutoMapper>();

        }
    }
}
