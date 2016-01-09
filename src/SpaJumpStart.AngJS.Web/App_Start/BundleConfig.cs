using System.Web.Optimization;

namespace SpaJumpStart.AngJS.Web.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Assets/Scripts/JS").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/modernizr-*",
                "~/Scripts/respond.js",
                //"~/Scripts/ripples.js",
                //"~/Scripts/material.js",
                "~/Scripts/jquery.validate.js",
                "~/Scripts/jquery.validate.unobtrusive.js",
                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-resource.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-loader.js",
                "~/Scripts/angular-aria.js",
                "~/Scripts/angular-cookies.js",
                "~/Scripts/angular-message-format.js",
                "~/Scripts/angular-messages.js",
                "~/Scripts/angular-mocks.js",
                "~/Scripts/angular-sanitize.js",
                "~/Scripts/angular-scenario.js",
                "~/Scripts/angular-touch.js",
                "~/Scripts/i18n/angular-locale_en-gb.js",
                "~/Scripts/angular-ui/ui-bootstrap.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                "~/app/app.js"
                ));

            bundles.Add(new StyleBundle("~/Assets/Styles/CSS").Include(
                "~/Content/bootstrap.css",
                "~/Content/bootstrap-theme.css",
                //"~/Content/roboto.css",
                //"~/Content/ripples.css",
                //"~/Content/material.css",
                "~/Styles/site.css"
                ));


            BundleTable.EnableOptimizations = true;
        }
    }
}
