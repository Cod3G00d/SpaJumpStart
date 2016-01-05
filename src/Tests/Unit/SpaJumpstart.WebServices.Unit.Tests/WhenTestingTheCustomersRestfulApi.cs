using NUnit.Framework;
using Rhino.Mocks;
using AutoMapper;
using System.Collections.Generic;
using System.Net.Http;

using System.Web.Http;
using System.Web.Http.Routing;
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;

using SpaJumpstart.Common.Testing;
using SpaJumpstart.Common.Testing.Builders.Domain;
using SpaJumpstart.Common.Testing.Builders.Dto;
using SpaJumpstart.Domain.Entities;
using SpaJumpstart.Domain.Data.UnitOfWork;
using SpaJumpstart.WebServices.Controllers;
using SpaJumpstart.DataContracts.Dtos;
using SpaJumpstart.Domain.Services;
using System.Web.Http.Results;

namespace SpaJumpstart.WebServices.Unit.Tests
{
    public abstract class WhenTestingTheCustomersRestfulApi : WhenTestingTheBehaviourOfSomething
    {
        //Item under test
        protected CustomersController CustomerControllerApi { get; set; }

        protected ICustomerService MockCustomerService { get; set; }
        protected ICustomerService StubCustomerService { get; set; }

        protected IMappingEngine StubAutoMapper { get; set; }
        protected IUnitOfWork StubUnitOfWork { get; set; }

        //protected IEnumerable<Customer> Response { get; set; }
        //protected Task<IEnumerable<Customer>> Response { get; set; }
        protected CreatedAtRouteNegotiatedContentResult<CustomerDto> PostResult { get; set; }
        protected HttpResponseMessage Response { get; set; }

        protected IEnumerable<Customer> ActualCustomers { get; set; }
        protected Customer ExpectedNewCustomer { get; set; }
        protected Customer NewCustomer { get; set; }

        protected IEnumerable<CustomerDto> ExpectedCustomersDto { get; set; }
        protected CustomerDto NewCustomerDto { get; set; }
        protected CustomerDto ExpectedCustomerDto { get; set; }

        protected string ExpectedJson { get; set; }

        #region Setup and Teardown

        [TearDown]
        public void TestFixtureCleanup()
        {
            StubAutoMapper = null;
            StubCustomerService = null;
            StubUnitOfWork = null;
            CustomerControllerApi.Dispose();
            CustomerControllerApi = null;
        }

        [SetUp]
        public void TestFixtureSetup()
        {
            /*
            Dependencies required during DI
            */

            MockCustomerService = MockRepository.GenerateMock<ICustomerService>();

            StubCustomerService = MockRepository.GenerateStub<ICustomerService>();
            StubAutoMapper = MockRepository.GenerateStub<IMappingEngine>();
            StubUnitOfWork = MockRepository.GenerateStub<IUnitOfWork>();

            CustomerControllerApi = new CustomersController(StubCustomerService, StubAutoMapper);
        }

        #endregion

        protected void ConfigureApi(HttpMethod httpMethod, string url)
        {
            /*
             Its important to set the Request and configuration on the Controller otherwise it will fail, with exceptions, 
             ArgumentNull or InvalidOperation exceptions
             */

            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, url);
            var route = config.Routes.MapHttpRoute("ApiRoute", "api/{controller}/{id}");
            var routeData = new HttpRouteData(route, new HttpRouteValueDictionary { { "controller", "customers" } });
            
            CustomerControllerApi.ControllerContext = new HttpControllerContext(config, routeData, request);
            //The line below was needed in WebApi RC as null config causes an issue
            //CustomerControllerApi.Configuration = new System.Web.Http.HttpConfiguration(new System.Web.Http.HttpRouteCollection());
            //The line below was needed in WebApi RC as null config causes an issue
            CustomerControllerApi.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
        }

        protected override void Setup()
        {
            Customer existingCustomer1 = CustomerBuilder.Build.AnInstance();
            Customer existingCustomer2 = CustomerBuilder.Build
                .WithCustomerId(2)
                .WithFirstname("Claire")
                .WithSurname("Rhymes")
                .AnInstance();
            existingCustomer2.Address.Id = 2;

            ActualCustomers = CustomerCollectionBuilder.Build
                .Add(existingCustomer1)
                .Add(existingCustomer2)
                .AnInstance();

            CustomerDto existingCustomerDto1 = CustomerDtoBuilder.Build.AnInstance();
            CustomerDto existingCustomerDto2 = CustomerDtoBuilder.Build
                .WithFirstname("Claire")
                .WithSurname("Rhymes")
                .AnInstance();

            ExpectedCustomersDto = CustomerDtoCollectionBuilder.Build
                .Add(existingCustomerDto1)
                .Add(existingCustomerDto2)
                .AnInstance();

            NewCustomerDto = CustomerDtoBuilder.Build.AnInstance(); 
            NewCustomerDto.Id=0;
            NewCustomerDto.Address.Id = 0;
            
            NewCustomer = CustomerBuilder.Build.AnInstance();
            var appUserId = NewCustomer.ApplicationUserId;
            NewCustomer.ApplicationUserId = "";

            ExpectedNewCustomer = NewCustomer;
            ExpectedNewCustomer.ApplicationUserId = appUserId;

            ExpectedCustomerDto = existingCustomerDto1;
        }

        protected override void ArrangeAndAct()
        {
            Setup();
        }
    }
}
