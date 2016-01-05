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

namespace SpaJumpstart.WebServices.Unit.Tests.Controllers.CustomersTests.Get
{
    [TestFixture]
    public class ApiGetByIdAsync_ReturnsOk : WhenTestingTheCustomersRestfulApi
    {
        #region Arrange

        protected override void Setup()
        {
            base.Setup();

            /*
            Stub the interface dependencies, don't need to use the actual objects, but force of habit
            */
            StubCustomerService.Stub(s => s.GetByIdAsync(1)).Return(Task.FromResult(ActualCustomers.FirstOrDefault()));
            StubAutoMapper.Stub(m => m.Map<Customer, CustomerDto>(ActualCustomers.FirstOrDefault())).Return(ExpectedCustomerDto);

            ConfigureApi(HttpMethod.Get, "http://localhost/api/customers/1");

            ExpectedJson = JsonConvert.SerializeObject(ExpectedCustomerDto);
        }

        #endregion

        #region Act

        protected override async void ArrangeAndAct()
        {
            Setup();
            Response = await CustomerControllerApi.GetCustomerByIdAsync(1);
        }

        #endregion

        #region Assert

        [Test]
        public void GetByIdAsync_ItShouldCallTheAutoMapperEngine()
        {
            ArrangeAndAct();
            StubAutoMapper.AssertWasCalled(m => m.Map<Customer, CustomerDto>(ActualCustomers.FirstOrDefault()));
        }
        [Test]
        public void GetByIdAsync_ItShouldCallTheCustomerService()
        {
            ArrangeAndAct();
            StubCustomerService.AssertWasCalled(s => s.GetByIdAsync(Arg<int>.Is.Anything));
        }
        [Test]
        public void GetAllAsync_ItShouldNotReturnANullResult()
        {
            ArrangeAndAct();
            Assert.IsNotNull(Response, "Response was empty");
        }
        [Test]
        public void GetByIdAsync_ItShouldNotReturnANullContent()
        {
            ArrangeAndAct();
            Assert.IsNotNull(Response.Content, "Response Content was empty");
        }
        [Test]
        public void GetByIdAsync_ItShouldReturnStatusOk()
        {
            ArrangeAndAct();
            Assert.IsTrue(Response.IsSuccessStatusCode);
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode, "Expecting a 200 Message");
        }
        [Test]
        public void GetByIdAsync_ItShouldReturnTheExpectedCustomerDto()
        {
            ArrangeAndAct();
            CustomerDto customerDto;
            Assert.IsTrue(Response.TryGetContentValue<CustomerDto>(out customerDto));


            Assert.AreEqual(ExpectedCustomerDto, customerDto);
            Assert.AreEqual(1, customerDto.Id);
        }
        [Test]
        public void GetByIdAsync_ItShouldReturnTheCorrectJson()
        {
            ArrangeAndAct();
            var jsonString = Response.Content.ReadAsStringAsync().Result;
            var customersDto = JsonConvert.DeserializeObject<CustomerDto>(jsonString);
            Assert.AreEqual(ExpectedJson, jsonString);

        }
        [Test]
        public void GetByIdAsync_ItShouldReturnTheCorrectHeaderMediaType()
        {
            ArrangeAndAct();
            Assert.AreEqual("application/json", Response.Content.Headers.ContentType.MediaType);
        }

        #endregion
    }
}
