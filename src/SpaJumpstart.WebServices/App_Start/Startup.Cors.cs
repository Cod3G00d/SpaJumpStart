using Microsoft.Owin;
using Owin;

namespace SpaJumpstart.WebServices
{
    public partial class Startup
    {
        public void ConfigureCors(IAppBuilder app)
        {
            app.Use(async (context, next) =>
            {
                IOwinRequest req = context.Request;
                IOwinResponse res = context.Response;
                // for auth2 token requests
                if (req.Path.StartsWithSegments(new PathString("/Token")))
                {
                    // if there is an origin header
                    var origin = req.Headers.Get("Origin");
                    if (!string.IsNullOrEmpty(origin))
                    {
                        // allow the cross-site request
                        res.Headers.Set("Access-Control-Allow-Origin", origin);
                    }

                    // if this is pre-flight request
                    if (req.Method == "OPTIONS")
                    {
                        // respond immediately with allowed request methods and headers
                        res.StatusCode = 200;
                        res.Headers.AppendCommaSeparatedValues("Access-Control-Allow-Methods", "GET", "POST");
                        res.Headers.AppendCommaSeparatedValues("Access-Control-Allow-Headers", "authorization", "content-type");
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