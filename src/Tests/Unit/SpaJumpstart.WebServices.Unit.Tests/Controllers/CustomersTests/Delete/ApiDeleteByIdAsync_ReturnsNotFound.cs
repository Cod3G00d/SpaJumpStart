using NUnit.Framework;
using Rhino.Mocks;

using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

using SpaJumpstart.Domain.Entities;

namespace SpaJumpstart.WebServices.Unit.Tests.Controllers.CustomersTests.Delete
{
    [TestFixture]
    public class ApiDeleteByIdAsync_ReturnsNotFound : WhenTestingTheCustomersRestfulApi
    {
        #region Arrange

        protected override void Setup()
        {
            base.Setup();

            /*
            Stub the interface dependencies, don't need to use the actual objects, but force of habit
            */
            StubCustomerService.Stub(s => s.GetByIdAsync(-99)).Return(Task.FromResult(new Customer { }));
            StubCustomerService.Stub(s => s.DeleteAsync(ActualCustomers.FirstOrDefault())).Return(Task.FromResult(ActualCustomers.FirstOrDefault()));

            ConfigureApi(HttpMethod.Delete, "http://localhost/api/customers/-99");
        }

        #endregion

        #region Act

        protected override async void ArrangeAndAct()
        {
            Setup();
            Response = await CustomerControllerApi.DeleteCustomersByIdAsync(-99);
        }

        #endregion

        #region Assert

        [Test]
        public void DeleteByIdAsyncNotFound_ItShouldCallTheCustomerService_GetByIdMethod()
        {
            ArrangeAndAct();
            StubCustomerService.AssertWasCalled(s => s.GetByIdAsync(Arg<int>.Is.Anything));
        }
        [Test]
        public void DeleteByIdAsyncNotFound_ItShouldNotCallTheCustomerService_DeleteMethod()
        {
            ArrangeAndAct();
            StubCustomerService.AssertWasNotCalled(s => s.DeleteAsync(Arg<Customer>.Is.Anything));
        }
        [Test]
        public void DeleteByIdAsyncNotFound_ItShouldNotReturnANullResult()
        {
            ArrangeAndAct();
            Assert.IsNotNull(Response, "Response was empty");
        }
        [Test]
        public void DeleteByIdAsyncNotFound_ItShouldNotReturnANullContent()
        {
            ArrangeAndAct();
            Assert.IsNotNull(Response.Content, "Response Content was empty");
        }
        [Test]
        public void DeleteByIdAsyncNotFound_ItShouldReturnStatusNotFound()
        {
            ArrangeAndAct();
            Assert.AreEqual(HttpStatusCode.NotFound, Response.StatusCode, "Expecting an Invalid Message");
        }
        [Test]
        public void DeleteByIdAsyncNotFound_ItShouldReturnAnHttpError()
        {
            ArrangeAndAct();
            var content = Response.Content as ObjectContent;
            Assert.IsInstanceOf<HttpError>(content.Value);
        }
        [Test]
        public void DeleteByIdAsyncNotFound_ItShouldReturnTheCorrectErrorMessage()
        {
            ArrangeAndAct();

            string errorMessage = ((HttpError)((ObjectContent<HttpError>)Response.Content).Value).Message;

            Assert.AreEqual("Invalid Customer Id", errorMessage, "Expecting an Invalid Message");
        }
        #endregion
    }
}
