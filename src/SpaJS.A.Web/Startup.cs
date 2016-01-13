using Microsoft.Owin;
using Owin;

//[assembly: OwinStartupAttribute(typeof(SpaJumpStart.Angular.Web.App.Startup))]

namespace SpaJumpStart.Angular.Web.App
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);

            //All Web API

            //var config = new HttpConfiguration();
            //config.MapHttpAttributeRoutes();

            //WebApiConfig.Register(config);

            //app.UseWebApi(config);

        }
    }
}
