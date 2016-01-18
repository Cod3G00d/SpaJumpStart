using NUnit.Framework;
using Rhino.Mocks;
using SpaJumpstart.DataContracts.Dtos;
using SpaJumpstart.Domain.Entities;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web.Http.Results;

namespace SpaJumpstart.WebServices.Unit.Tests.Controllers.CustomersTests.Post
{
    [TestFixture]
    public class ApiCreateAsync_ShoudlReturnCustomer :WhenTestingTheCustomersRestfulApi
    {
        #region Arrange

        protected override void Setup()
        {
            base.Setup();

            /*
            Stub the interface dependencies, don't need to use the actual objects, but force of habit
            */
            //StubCustomerService.Stub(s => s.AddAsync(NewCustomer)).Return(Task.FromResult(ExpectedNewCustomer));
            StubCustomerService.Stub(s => s.AddCustomerAsync(NewCustomer)).Return(Task.FromResult(ExpectedNewCustomer));
            StubAutoMapper.Stub(m => m.Map<CustomerDto, Customer>(NewCustomerDto)).Return(NewCustomer);

            ConfigureApi(HttpMethod.Post, "http://localhost/api/customers/");

            //Create a new user, need to swap this to a Mock Object
            CustomerControllerApi.User = new ClaimsPrincipal(new GenericPrincipal(new GenericIdentity("user"), null));
        }

        #endregion

        #region Act

        protected override async void ArrangeAndAct()
        {
            Setup();
            PostResult = await CustomerControllerApi.PostCreateCustomersAsync(NewCustomerDto) as CreatedAtRouteNegotiatedContentResult<CustomerDto>;
        }

        #endregion

        #region Assert

        [Test]
        public void CreateAsync_ItShouldCallTheAutoMapperEngine()
        {
            ArrangeAndAct();
            StubAutoMapper.AssertWasCalled(m => m.Map<CustomerDto, Customer>(NewCustomerDto));
        }
        [Test]
        public void CreateAsync_ItShouldCallTheCustomerService()
        {
            ArrangeAndAct();
            //StubCustomerService.AssertWasCalled(s => s.AddAsync(NewCustomer));
            StubCustomerService.AssertWasCalled(s => s.AddCustomerAsync(NewCustomer));
        }
        [Test]
        public void CreateAsync_ItShouldNotReturnANullResult()
        {
            ArrangeAndAct();
            Assert.IsNotNull(PostResult, "Post Response was empty");
        }
        [Test]
        public void CreateAsync_ItShouldNotReturnANullContent()
        {
            ArrangeAndAct();
            Assert.IsNotNull(PostResult.Content, "Post Content was empty");
        }
        //[Test]
        //public void CreateAsync_ItShouldReturnStatusCreated()
        //{
        //    ArrangeAndAct();
        //    Assert.AreEqual(HttpStatusCode.Created, Response.StatusCode, "Expecting a 201 Message");
        //}
        [Test]
        public void CreateAsync_ItShouldReturnTheCorrectRoutename()
        {
            ArrangeAndAct();
            Assert.AreEqual("ApiRoute", PostResult.RouteName);
        }
        [Test]
        public void CreateAsync_ItShouldReturnAnTheCorrectId()
        {
            ArrangeAndAct();
            Assert.AreEqual(1, PostResult.RouteValues["id"]);
        }

        #endregion
    }
}
