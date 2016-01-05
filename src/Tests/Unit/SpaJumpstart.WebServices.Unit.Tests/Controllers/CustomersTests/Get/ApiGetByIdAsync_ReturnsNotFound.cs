using NUnit.Framework;
using Rhino.Mocks;

using System.Net.Http;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Net;

using SpaJumpstart.DataContracts.Dtos;
using SpaJumpstart.Domain.Entities;
using SpaJumpstart.WebServices.Controllers;
using System.Linq;
using System.Web.Http;

namespace SpaJumpstart.WebServices.Unit.Tests.Controllers.CustomersTests.Get
{
    [TestFixture]
    public class ApiGetByIdAsync_ReturnsNotFound : WhenTestingTheCustomersRestfulApi
    {
        #region Arrange

        protected override void Setup()
        {
            base.Setup();

            /*
            Stub the interface dependencies, don't need to use the actual objects, but force of habit
            */
            StubCustomerService.Stub(s => s.GetByIdAsync(-99)).Return(Task.FromResult(new Customer { }));
            //StubAutoMapper.Stub(m => m.Map<Customer, CustomerDto>(ActualCustomers.FirstOrDefault())).Return(ExpectedCustomerDto);
            
            ConfigureApi(HttpMethod.Get, "http://localhost/api/customers/-99");

            ExpectedJson = "{\"Message\":\"Invalid Customer Id\"}";
        }

        #endregion

        #region Act

        protected override async void ArrangeAndAct()
        {
            Setup();
            Response = await CustomerControllerApi.GetCustomerByIdAsync(-99);
        }

        #endregion

        #region Assert

        [Test]
        public void GetByIdAsyncNotFound_ItShouldNotCallTheAutoMapperEngine()
        {
            ArrangeAndAct();
            StubAutoMapper.AssertWasNotCalled(m => m.Map<Customer, CustomerDto>(ActualCustomers.FirstOrDefault()));
        }
        [Test]
        public void GetByIdAsyncNotFound_ItShouldCallTheCustomerService()
        {
            ArrangeAndAct();
            StubCustomerService.AssertWasCalled(s => s.GetByIdAsync(Arg<int>.Is.Anything));
        }
        [Test]
        public void GetByIdAsyncNotFound_ItShouldNotReturnANullResult()
        {
            ArrangeAndAct();
            Assert.IsNotNull(Response, "Response was empty");
        }
        [Test]
        public void GetByIdAsyncNotFound_ItShouldNotReturnANullContent()
        {
            ArrangeAndAct();
            Assert.IsNotNull(Response.Content, "Response Content was empty");
        }
        [Test]
        public void GetByIdAsyncNotFound_ItShouldReturnStatusNotFound()
        {
            ArrangeAndAct();
            Assert.AreEqual(HttpStatusCode.NotFound, Response.StatusCode, "Expecting an Invalid Message");
        }
        [Test]
        public void GetByIdAsyncNotFound_ItShouldReturnAnHttpError()
        {
            ArrangeAndAct();
            var content = Response.Content as ObjectContent;
            Assert.IsInstanceOf<HttpError>(content.Value);
        }
        [Test]
        public void GetByIdAsyncNotFound_ItShouldReturnTheCorrectErrorMessage()
        {
            ArrangeAndAct();

            string errorMessage = ((HttpError)((ObjectContent<HttpError>)Response.Content).Value).Message;

            Assert.AreEqual("Invalid Customer Id", errorMessage, "Expecting an Invalid Message");
        }
        [Test]
        public void GetByIdAsyncNotFound_ItShouldReturnTheCorrectJsonErrorMessage()
        {
            ArrangeAndAct();
            var jsonString = Response.Content.ReadAsStringAsync().Result;

            Assert.AreEqual(ExpectedJson, jsonString, "Expecting an Invalid Message");
        }

        #endregion
    }
}
