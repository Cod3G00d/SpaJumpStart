using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Net.Http.Formatting;
using System.Web.Http.Cors;
using SpaJumpstart.WebServices.Cors;

namespace SpaJumpstart.WebServices
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            config.ApplyTo(
                //ConfigureAuth,
                //ConfigureCors,
                //ConfigureFilters,
                ConfigureFormatters,
                ConfigureRoutes
             );
        }

        private static void ConfigureAuth(HttpConfiguration config)
        {
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));
        }

        private static void ConfigureCors(HttpConfiguration config)
        {
            var corsConfig = new EnableCorsAttribute(AppCorsConstants.AllowedOrigins, AppCorsConstants.AllowedHeaders, AppCorsConstants.AllowedMethods);
            config.EnableCors(corsConfig);

            // Add handler to deal with preflight requests, this is the important part
            //config.MessageHandlers.Add(new CorsHandler());
        }

        private static void ConfigureRoutes(HttpConfiguration config)
        {
            // Web API routes
            //config.MapHttpAttributeRoutes();
            config.EnsureInitialized();

            config.Routes.MapHttpRoute(
                name: "ApiRoute",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

        private static void ConfigureFormatters(HttpConfiguration config)
        {
            var formatters = config.Formatters;
            formatters.Remove(formatters.XmlFormatter);

            var jsonFormatter = formatters.JsonFormatter;
            jsonFormatter.MediaTypeMappings.Add(new QueryStringMapping("json", "true", "application/json"));

            var settings = jsonFormatter.SerializerSettings;
            settings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            settings.Formatting = Formatting.Indented;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }

 

        private static void ApplyTo<T>(this T source, params System.Action<T>[] targets)
        {
            foreach (var target in targets)
            {
                target(source);
            }
        }
    }
}
