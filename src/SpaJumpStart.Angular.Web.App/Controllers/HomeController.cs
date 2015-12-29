using System.Web.Mvc;

namespace SpaJumpStart.Angular.Web.App.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}