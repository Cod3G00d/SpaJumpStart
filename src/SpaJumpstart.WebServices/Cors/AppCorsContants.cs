using System.Configuration;

namespace SpaJumpstart.WebServices.Cors
{
    public static class AppCorsConstants
    {
        private const string keyCorsAllowOrigin = "cors:allowOrigins";
        private const string allowedMethods = "ACCEPT, PROPFIND, PROPPATCH, COPY, MOVE, DELETE, MKCOL, LOCK, UNLOCK, PUT, GETLIB, VERSION-CONTROL, CHECKIN, CHECKOUT, UNCHECKOUT, REPORT, UPDATE, CANCELUPLOAD, HEAD, OPTIONS, GET, POST";
        private const string allowedHeaders = "Accept, Overwrite, Destination, Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control";

        public static string AllowedOrigins
        {
            get
            {
                return ConfigurationManager.AppSettings[keyCorsAllowOrigin];
            }
        }

        public static string AllowedMethods
        {
            get { return allowedMethods; }
        }

        public static string AllowedHeaders
        {
            get { return allowedHeaders; }
        }
    }
}