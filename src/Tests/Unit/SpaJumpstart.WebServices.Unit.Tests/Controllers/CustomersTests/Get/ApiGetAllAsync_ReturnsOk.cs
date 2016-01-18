using NUnit.Framework;
using Rhino.Mocks;
using System.Net.Http;
using System.Net;
using SpaJumpstart.DataContracts.Dtos;
using SpaJumpstart.WebServices.Controllers;
using SpaJumpstart.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using SpaJumpstart.Domain.Services;
using SpaJumpstart.Domain.Data.UnitOfWork;
using System.Linq;
using Newtonsoft.Json;

/*
Test Refs:

    Fluent Testing of WebAPIs
    https://github.com/ivaylokenov/MyTested.WebApi/tree/master/src/MyTested.WebApi
    http://stackoverflow.com/questions/19166967/web-api-unit-test-for-exception


    http://www.asp.net/web-api/overview/testing-and-debugging/unit-testing-controllers-in-web-api
    http://www.peterprovost.org/blog/2012/06/16/unit-testing-asp-dot-net-web-api

    http://www.asp.net/web-api/overview/testing-and-debugging/unit-testing-with-aspnet-web-api
    https://dzone.com/articles/unit-testing-asynchronous-web
    https://lostechies.com/chrismissal/2010/02/05/unit-testing-simple-asp-net-mvc-controllers/

    http://chsakell.com/2015/05/10/asp-net-web-api-unit-testing/
    http://chsakell.com/2015/05/10/asp-net-web-api-unit-testing/#ControllersTesting
    http://chsakell.com/2015/05/10/asp-net-web-api-unit-testing/#ServicesTesting



    http://www.strathweb.com/2012/06/asp-net-web-api-integration-testing-with-in-memory-hosting/

    http://stackoverflow.com/questions/24131067/deserialize-json-to-array-or-list-with-httpclient-readasasync-using-net-4-0-ta

    Update:
    http://stackoverflow.com/questions/30996024/check-calls-received-for-async-method

    post:
    http://stackoverflow.com/questions/10042290/sample-code-for-unit-testing-api-controllers

    Exceptions
    https://groups.google.com/forum/#!topic/nsubstitute/8qP8tzARtFI

    Repo or Not
    http://www.codeproject.com/Articles/875165/To-Repository-Or-NOT

    Mocking Automapper
    http://stackoverflow.com/questions/14630422/how-to-mock-automapper-in-asp-net-mvc-unit-tests

    Mocking a service containing resource in AngularJS
    http://stackoverflow.com/questions/24381698/how-to-mock-a-service-containing-a-resource-in-angularjs?lq=1

    Unit testing MVC Controllers
    http://geekswithblogs.net/Frez/archive/2013/04/26/unit-testing-an-asp.net-mvc-4-controller-using-ms-test.aspx

    */

namespace SpaJumpstart.WebServices.Unit.Tests.Controllers.CustomersTests.Get
{
    [TestFixture]
    public class ApiGetAllAsync_ReturnsOk : WhenTestingTheCustomersRestfulApi
    {
        #region Arrange

        protected override void Setup()
        {
            base.Setup();

            /*
            Stub the interface dependencies, don't need to use the actual objects, but force of habit
            */
            StubCustomerService.Stub(s => s.GetAllAsync()).Return(Task.FromResult(ActualCustomers));
            StubAutoMapper.Stub(m => m.Map<IEnumerable<Customer>, IEnumerable<CustomerDto>>(ActualCustomers)).Return(ExpectedCustomersDto);

            /*
            Its important to set the Request and configuration on the Controller otherwise it will fail, with exceptions, 
            ArgumentNull or InvalidOperation exceptions
            */

            //CustomerControllerApi = new CustomersController(StubCustomerService, StubAddressService, StubAutoMapper);
            CustomerControllerApi = new CustomersController(StubCustomerService, StubAutoMapper);
            CustomerControllerApi.Request = new HttpRequestMessage(HttpMethod.Get, "http://localhost/api/customers");
            //The line below was needed in WebApi RC as null config causes an issue
            CustomerControllerApi.Configuration = new System.Web.Http.HttpConfiguration(new System.Web.Http.HttpRouteCollection());

            ExpectedJson = JsonConvert.SerializeObject(ExpectedCustomersDto);
        }

        #endregion

        #region Act

        protected override async void ArrangeAndAct()
        {
            Setup();
            Response = await CustomerControllerApi.GetAllCustomersAsync();
        }

        #endregion

        #region Assert

        [Test]
        public void GetAllAsync_ItShouldCallTheAutoMapperEngine()
        {
            ArrangeAndAct();
            StubAutoMapper.AssertWasCalled(m => m.Map(ActualCustomers, ExpectedCustomersDto));
        }

        [Test]
        public void GetAllAsync_ItShouldCallTheCustomerService()
        {
            ArrangeAndAct();
            StubCustomerService.AssertWasCalled(s => s.GetAllAsync());
        }

        //[Test]
        //public void IsShouldverifyAll()
        //{
        //    Result.VerifyAllExpectations();
        //}

        [Test]
        public void GetAllAsync_ItShouldNotReturnANullResult()
        {
            ArrangeAndAct();
            Assert.IsNotNull(Response);

            //Assert.IsNotNull(resultCustomers, "Response was empty!");
            ////Assert.AreEqual(1, resultCustomers.Id, "Customers id should be set");
            
        }

        [Test]
        public void GetAllAsync_ItShouldNotReturnANullContent()
        {
            ArrangeAndAct();
            Assert.IsNotNull(Response.Content);
        }
        [Test]
        public void GetAllAsync_ItShouldReturnStatusOk()
        {
            ArrangeAndAct();
            Assert.IsTrue(Response.IsSuccessStatusCode);
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode, "Expecting a 200 Message");
        }
        [Test]
        public void GetAllAsync_ItShouldReturnTheExpectedCustomerDtos()
        {
            ArrangeAndAct();
            IEnumerable<CustomerDto> customersDto;
            Assert.IsTrue(Response.TryGetContentValue<IEnumerable<CustomerDto>>(out customersDto));

            Assert.AreEqual(ExpectedCustomersDto, customersDto);
            Assert.AreEqual(2, customersDto.Count());
            Assert.AreEqual(1, customersDto.FirstOrDefault().Id);
        }
        [Test]
        public void GetAllAsync_ItShouldReturnTheCorrectJson()
        {
            ArrangeAndAct();
            //var resultCustomers = Response.Content.ReadAsAsync<CustomerDto>().Result;
            var jsonString = Response.Content.ReadAsStringAsync().Result;
            var customersDto = JsonConvert.DeserializeObject<IEnumerable<CustomerDto>>(jsonString);
            Assert.AreEqual(ExpectedJson, jsonString);

        }
        [Test]
        public void GetAllAsync_ItShouldReturnTheCorrectHeaderMediaType()
        {
            ArrangeAndAct();
            Assert.AreEqual("application/json", Response.Content.Headers.ContentType.MediaType);
        }

        #endregion
    }
}
