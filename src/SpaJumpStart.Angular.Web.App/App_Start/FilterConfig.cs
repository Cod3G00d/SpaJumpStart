using System.Web;
using System.Web.Mvc;

namespace SpaJumpStart.Angular.Web.App
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
