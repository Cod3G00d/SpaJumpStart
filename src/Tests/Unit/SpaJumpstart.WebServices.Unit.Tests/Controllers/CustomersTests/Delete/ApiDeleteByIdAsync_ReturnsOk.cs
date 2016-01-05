using NUnit.Framework;
using Rhino.Mocks;

using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

using SpaJumpstart.Domain.Entities;

namespace SpaJumpstart.WebServices.Unit.Tests.Controllers.CustomersTests.Delete
{
    [TestFixture]
    public class ApiDeleteByIdAsync_ReturnsOk : WhenTestingTheCustomersRestfulApi
    {
        #region Arrange

        protected override void Setup()
        {
            base.Setup();

            /*
            Stub the interface dependencies, don't need to use the actual objects, but force of habit
            */
            StubCustomerService.Stub(s => s.GetByIdAsync(1)).Return(Task.FromResult(ActualCustomers.FirstOrDefault()));
            StubCustomerService.Stub(s => s.DeleteAsync(ActualCustomers.FirstOrDefault())).Return(Task.FromResult(ActualCustomers.FirstOrDefault()));

            ConfigureApi(HttpMethod.Delete, "http://localhost/api/customers/1");
        }

        #endregion

        #region Act

        protected override async void ArrangeAndAct()
        {
            Setup();
            Response = await CustomerControllerApi.DeleteCustomersByIdAsync(1);
        }

        #endregion

        #region Assert

        [Test]
        public void DeleteByIdAsync_ItShouldCallTheCustomerService_GetByIdMethod()
        {
            ArrangeAndAct();
            StubCustomerService.AssertWasCalled(s => s.GetByIdAsync(Arg<int>.Is.Anything));
        }
        [Test]
        public void DeleteByIdAsync_ItShouldCallTheCustomerService_DeleteMethod()
        {
            ArrangeAndAct();
            StubCustomerService.AssertWasCalled(s => s.DeleteAsync(Arg<Customer>.Is.Anything));
        }
        [Test]
        public void DeleteByIdAsync_ItShouldNotReturnANullResult()
        {
            ArrangeAndAct();
            Assert.IsNotNull(Response, "Response was empty");
        }
        [Test]
        public void DeleteByIdAsyn_ItShouldNotReturnANullContent()
        {
            ArrangeAndAct();
            Assert.IsNotNull(Response.Content, "Response Content was empty");
        }
        [Test]
        public void DeleteByIdAsyn_ItShouldReturnStatusOk()
        {
            ArrangeAndAct();
            Assert.IsTrue(Response.IsSuccessStatusCode);
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode, "Expecting a 200 Message");
        }

        #endregion

    }
}
