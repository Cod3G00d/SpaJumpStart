using Microsoft.Owin;
using Owin;
using System.Web.Mvc;
using System.Web.Routing;

namespace SpaJumpStart.Angular.Web.App
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
