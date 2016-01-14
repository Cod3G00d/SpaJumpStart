using Microsoft.Owin;
using Owin;
using System.Web.Configuration;

/*
See: stackoverflow.com/questions/30797323/url-rewrite-module-iis-not-working-with-owin-middleware-hosted-on-iis
http://stackoverflow.com/questions/20079813/how-to-make-cors-authentication-in-webapi-2
http://stackoverflow.com/questions/30797323/url-rewrite-module-iis-not-working-with-owin-middleware-hosted-on-iis
http://stackoverflow.com/questions/26980271/web-api-2-preflight-cors-request-for-bearer-token
www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api
https://www.youtube.com/watch?v=RiOqC8oOSl8
http://oscarmeszar.com/angularjs-webapi-owin-authorizationauthentication-role-based/
*/

namespace SpaJumpstart.WebServices
{
    public partial class Startup
    {
        public void ConfigureCors(IAppBuilder app)
        {
            var appSettings = WebConfigurationManager.AppSettings;

            // If CORS settings are present in Web.config
            if (!string.IsNullOrWhiteSpace(appSettings["cors:Origins"]))
            {

                // Load CORS settings from Web.config

                //< appSettings >
                //< add key = "cors:Origins" value = "*" />
                //< add key = "cors:Headers" value = "*" />
                //< add key = "cors:Methods" value = "GET, POST, OPTIONS, PUT, DELETE" />
                //</ appSettings >

                var origins = appSettings["cors:Origins"];
                //var headers = appSettings["cors:Headers"];
                //var methods = appSettings["cors:Methods"];

            }


            app.Use(async (context, next) =>
            {
                IOwinRequest req = context.Request;
                IOwinResponse res = context.Response;
                // for auth2 token requests, and web api requests
                if (req.Path.StartsWithSegments(new PathString("/Token")) ||
                    req.Path.StartsWithSegments(new PathString("/api")))
                {
             
                    // if there is an origin header
                    var origin = req.Headers.Get("Origin");


                    if (!string.IsNullOrEmpty(origin))
                    {
                        // allow the cross-site request
                        //res.Headers.Set("Access-Control-Allow-Origin", origin);
                        //res.Headers.Set("Access-Control-Allow-Credentials", "true");

                        if (!string.IsNullOrEmpty(origin))
                        {
                            res.Headers.Set("Access-Control-Allow-Origin", origin);
                        }
                        if (string.IsNullOrEmpty(res.Headers.Get("Access-Control-Allow-Credentials")))
                        {
                            res.Headers.Set("Access-Control-Allow-Credentials", "true");
                        }

                    }

                    // if this is pre-flight request
                    if (req.Method == "OPTIONS")
                    {
                        // respond immediately with allowed request methods and headers
                        res.StatusCode = 200;
                        //res.Headers.AppendCommaSeparatedValues("Access-Control-Allow-Methods", "GET", "POST");
                        res.Headers.AppendCommaSeparatedValues("Access-Control-Allow-Methods", "GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS");
                        //res.Headers.AppendCommaSeparatedValues("Access-Control-Allow-Headers", "authorization");
                        res.Headers.AppendCommaSeparatedValues("Access-Control-Allow-Headers", "authorization", "content-type");
                        //res.Headers.AppendCommaSeparatedValues("Access-Control-Allow-Headers", "Content-Type, Authorization");
                        //res.Headers.AppendCommaSeparatedValues("Access-Control-Allow-Credentials", "true");
                        // no further processing
                        return;
                    }
                }
                // continue executing pipeline
                await next();
            });
        }
    }
}