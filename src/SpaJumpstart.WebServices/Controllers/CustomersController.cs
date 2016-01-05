using SpaJumpstart.Domain.Services;
using SpaJumpstart.DataContracts.Dtos;

using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using SpaJumpstart.Domain.Entities;
using System.Net;
using System.Linq;
using System;
using Microsoft.AspNet.Identity;
using System.Data.Entity.Infrastructure;
using AutoMapper;

namespace SpaJumpstart.WebServices.Controllers
{
    /*
    Authorization Overview

    Authentication : user identity
    Authorization: decide on actions that are allowed (GET, POST, PUT, DELETE) in RESTful web services

    Using Token Based Authentication between the UI (front-end) and the Web API (back-end), now preferred to Cookie approach.
    A signed token can be sent with each request to the server.
    Benefits
    - Scalability of Server, Self Contained Tokens hold all the user info required for Authentication, so scaling the web farm is easy as there's no shared session etc
    - Loose Coupling, between front and back-end, in term of authentication mechanism, token is generated from the Server and the API built to understand it and do the authentication
    - Mobile Friendly, cookies not good on native platforms (Android, iOS, Windows Phone), storage difficult, hence tokens easier to access backend-APIs
    
    We are using ASP.NET Web API, ontop of OWin Middleware, rather than directly ontop of ASP.NET.
    The Owin Middleware Pipeline is used as a Server rather than ASP.NET pipeline.

    The reason is so we can configure the server to issue the OAuth bearer token authentication using Owen Middleware. The benefit being everything is
    set up on the same pipeline.
    The ASP.NET Identity system (built again ontop of Owin) is used to register new users, validate their credentials and generate authorization tokens.
    Owin defines a standard interface between .NET Web Servers and web apps. The goal is decoupling, and encouraging development of simple modules.
    see: http://owin.org/
    
    The Back-end API should also accept requests from any origin, not only our front-end so Cors will also be enabled.
    Cors is Cross Orgin Resource Sharing, see:  http://en.wikipedia.org/wiki/Cross-origin_resource_sharing

    The authorization server and filter call into the OWIN middleware component that handles the details of OAuth2.

    RESTRICTED CONTROLLER ACCESS, 
    ----------------------------
        Authorizatio using Individual Accounts
        i.e. Local Login
        not using Social Login
        http://www.asp.net/web-api/overview/security/individual-accounts-in-web-api
    
    
        Web API assumes authentication happens in the host, this is done using HTTP Modules.
        Hosts create a Principal when a user is authenticated, which represents security context under which the code is running.
        The host attaches this principal to the current thread, and contains an Identity Object containing info about the user.
        HTTP modules see are requests through the ASP.NET pipeline. They are specific to IIS (hence participate in logging, auditing etc)
        They run earlier in the pipeline.
        
        HTTP Message Handlers:
        recieve HTTP requests, and return HTTP responses.
        Typically they are chained together, the 1st handler receives a request, does some processing, hands-it-off to the next handler and so on, 
        until it returns a response back up the chain. This is a Delegating Handler pattern.

        On the Server-side Web API pipeline uses built-in message handlers:
        - HttpServer - gets request from host
        - HttpRoutingDispatcher - dispatches request based on Route
        - HttpControllerDispatcher - sends request to a Web API Controller

        In Web API The HttpMessageHandlers are used for authentication (rather than HTTP modules), and check the Identity of the Requesting User.
        They only see the requests that are routed to the API.
        They can participate in web-hosting and self-hosting.
        Principals don't get set until later in the pipeline when using HTTP message handlers.
        

        In Web API Authorization happens later in the ASP.NET Pipeline closer to the controllers, allowing for more granularity when granting resource access
        i.e. Authorization Filters run before the controller actions, if the request is not authorized, the filetr returns and error response, and the 
        action is not invoked.
    
        Web API has its own built-in Authorization Filter: AuthorizeAttribute, it needs to be added to the Global Filter List to restrict access
        Here we configure it at the controller level rather than Globally, using the [Authorize] attribute.
        This attribute filter exists in the System.Web.Http namespace.

        Here the Web API Contollers are acting as a Resource Server
        The Authentication Filter attribute below [Authorize] is used to add protection to the controller as a whole in this case
        It means all requests to the controller needs authorization, otherwise it's denied
        Web API returns a 401 Error (Unauthorized)

        [AllowAnonymous] attribute, can be used to allow unrestricted access on specific Actions (lift the security restrictions), 
        within a Restricted Controller.

        [Authorize(Roles="Administrators")], allows us to  further restrict by Roles, 
        or even users [Authorize(Users="Alice,Bob")]

        You can derive your own Custome Authorization Filter Attributes.

        You can also allow the request to access an Action, then restrict within the body of the action by checking the Pricipal e.g. to see if they
        are in a certain role.

        We can create custom handlers to be placed in the WebAPI pipeline, commonly we need to do this when handling Options and Cors.
        http://www.asp.net/web-api/overview/advanced/http-message-handlers

        Roles are usually used in Business and Financial apps to enforce Policy.
        Role-based security, can be used when multiple approvals are needed to complete an action.
        e.g. purchase requests vs purchase order vs sale

        In .NET role-based security is also based on the principal which is constructed from an associated Identity. Identities can be based on 
        Windows Account, or others, i.e. Social Accounts (e.g. Google, Facebook) etc

        HTTP modules better option than message handlers, especially if you dont need self-hosting.
        HTTP message handlers are good fro Cross-Cutting Concerns, operating at the level of HTTP messages (rather than controller actions), 
        e.g.
        - modifying request headers
        - adding header responses
        - validating requests before they reach the controller

        Packages used:
        
        For Building the ASP.NET Web API Backend...

        > Install-Package Microsoft.AspNet.WebApi.Owin
        > Install-Package Microsoft.Owin.Host.SystemWeb

        ASP.NET Identity - registering and validating user credentials, the other for persisting users to the database...
        For EF and IdentityDbContext see: http://odetocode.com/blogs/scott/archive/2014/01/03/asp-net-identity-with-the-entity-framework.aspx

        > Install-Package Microsoft.AspNet.Identity.Owin
        > Install-Package Microsoft.AspNet.Identity.EntityFramework

        To implement ASP.NET Identity see: http://odetocode.com/blogs/scott/archive/2014/01/20/implementing-asp-net-identity.aspx

        Add support for OAuth Bearer Tokens Generation...
        > Install-Package Microsoft.Owin.Security.OAuth

        references: 
        http://www.asp.net/web-api/overview/security/authentication-and-authorization-in-aspnet-web-api
        http://bitoftech.net/2014/06/01/token-based-authentication-asp-net-web-api-2-owin-asp-net-identity/
        http://www.asp.net/web-api/overview/security/individual-accounts-in-web-api
        http://blogs.msdn.com/b/webdev/archive/2013/09/20/understanding-security-features-in-spa-template.aspx
        
        Testing
        http://www.juliencorioland.net/archives/using-owin-to-test-your-web-api-controllers

        sources:
        https://github.com/tjoudeh/AngularJSAuthentication
        https://github.com/simonferquel/techdays-paris-2014-mvc-webapi/blob/master/EbookManager.Web/Api/EbooksController.cs
    
        */

    // Require authorization for all actions on the controller.
    //[Authorize]
    [RoutePrefix("api/Contacts")]
    public class CustomersController : ApiController
    {
        private readonly ICustomerService _customerService;
        private readonly IMappingEngine _mappingEngine;
        private string _user { get; set; }

        public CustomersController() { }

        public CustomersController(ICustomerService customerService, IMappingEngine mappingEngine)
        {
            _customerService = customerService;
            _mappingEngine = mappingEngine;
            _user = User.Identity.GetUserId();
        }

        /// <summary>
        /// Asynchronously get all customer data and address details
        /// </summary>
        /// <example>
        /// GET: http://localhost:1625/api/customers
        /// </example>

        // [HttpOptions]
        [HttpGet]
        [ResponseType(typeof(CustomerDto))]
        public async Task<HttpResponseMessage> GetAllCustomersAsync()
        {
            IEnumerable<Customer> customers = await _customerService.GetAllAsync();

            //IEnumerable<CustomerDto> customersDto = new List<CustomerDto>();

            // map domain objects to populate dto objects
            var customersDto = _mappingEngine.Map<IEnumerable<Customer>, IEnumerable<CustomerDto>>(customers);
            _mappingEngine.Map(customers, customersDto);

            if (customersDto == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No Customers found");
            }
            return Request.CreateResponse(HttpStatusCode.OK, customersDto.OrderByDescending(c => c.Surname).AsQueryable());
        }

        /// <summary>
        /// Asynchronously looks up customer and address data using int CustomerId.
        /// </summary>
        /// <example>
        /// GET: http://localhost:1625/api/customers/GetCustomerByIdAsync?id=1
        /// </example>
        /// <param name="id">The customerid of the data.</param>
        
        [HttpGet]
        //[HttpOptions]
        [ResponseType(typeof(Customer))]
        [Route("ById/{id:int}")]
        public async Task<HttpResponseMessage> GetCustomerByIdAsync(int id)
        {
            Customer customer = await _customerService.GetByIdAsync(id);
            if (customer.Id == 0)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invalid Customer Id");
            }

            CustomerDto customerDto;
            try
            {
                //AutoMapper mappings
                customerDto = _mappingEngine.Map<Customer, CustomerDto>(customer);
            }
            catch (Exception ex)
            {
                var errMessage = string.Format("An error occurred getting customer by Id {0}, error: {1} ", id, ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.NotModified, "Customer could not be mapped to Dto");
            }
            return Request.CreateResponse(HttpStatusCode.OK, customerDto);
        }

        /// <summary>
        /// Asynchronously create a new customer
        /// </summary>
        /// <example>
        /// POST: api/Customers/
        /// </example>
        /// <param name="id">The customerid of the data.</param>

        //[HttpOptions]
        [HttpPost]
        public async Task<HttpResponseMessage> PostCreateCustomersAsync(CustomerDto customerDto)
        {
            if (customerDto == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "customer cannot be null");
            }

            Customer customer = new Customer();
            try
            {
                customer = _mappingEngine.Map<CustomerDto, Customer>(customerDto);

                customer.ApplicationUserId = User.Identity.GetUserId();
                customer = await _customerService.AddAsync(customer);
                customerDto.Id = customer.Id;
            }
            catch (Exception ex)
            {
                var errMessage = string.Format("Customer could not be created by user: {1}, errormessage: ", _user, ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, errMessage);
            }
            
            var results =  CreatedAtRoute("ApiRoute", new { id = customerDto.Id }, customerDto);
            return Request.CreateResponse(HttpStatusCode.OK, results);
        }

        /// <summary>
        /// Asynchronously update an exisiting customer
        /// </summary>
        /// <example>
        /// PUT: api/Customers/5
        /// </example>
        /// <param name="id">The customerid of the data.</param>

        //[HttpOptions]
        [HttpPut]
        public async Task<HttpResponseMessage> PutUpdateCustomersAsync(int id, CustomerDto customerDto)
        {
            if (id != customerDto.Id)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Id's don't match");
            }

            try
            {
                customerDto.Id = id;

                Customer customer = await _customerService.GetByIdAsync(id);

                //_mappingEngine.Map(customerDto, customer);
                customer = _mappingEngine.Map<CustomerDto, Customer>(customerDto);

                await _customerService.UpdateAsync(customer);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!CustomerExists(id))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invalid Customer Id");
                }
                else
                {
                    var errMessage = string.Format("Customer could not be updated by user: {1}, errormessage: ", _user, ex.Message);
                    return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, errMessage);
                }
            }
            catch (Exception ex)
            {
                var errMessage = string.Format("Customer could not be updated by user: {1}, errormessage: ", _user, ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, errMessage);
            }

            return Request.CreateResponse(HttpStatusCode.OK, customerDto);
        }

        /// <summary>
        /// Asynchronously Delete an exisiting customer by id
        /// </summary>
        /// <example>
        /// DELETE: api/Customers/5
        /// </example>
        /// <param name="id">The customerid of the data.</param>

        //[HttpOptions]
        [HttpDelete]
        public async Task<HttpResponseMessage> DeleteCustomersByIdAsync(int id)
        {
            Customer customer = await _customerService.GetByIdAsync(id);
            if (customer.Id == 0)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invalid Customer Id");
            }

            try
            {
                await _customerService.DeleteAsync(customer);
            }
            catch (Exception ex)
            {
                var errMessage = string.Format("Customer cannot be deleted by user: {1}, errormessage: ", _user, ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, errMessage);
            }

            return Request.CreateResponse(HttpStatusCode.OK, customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_customerService != null)
                {
                    _customerService.Dispose();
                }
                
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(int id)
        {
            return _customerService.GetByIdAsync(id) != null;
        }
    }
}
