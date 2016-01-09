using SpaJumpStart.AngJS.Web.Web;
using System.Web.Optimization;

namespace KiksApp.Web
{
    public partial class Startup
    {
        public void Configuration()
        {
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
