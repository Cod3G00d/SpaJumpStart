using NUnit.Framework;
using Rhino.Mocks;
using SpaJumpstart.DataContracts.Dtos;
using SpaJumpstart.Domain.Entities;
using System.Net.Http;
using System.Security.Principal;
using System.Threading.Tasks;

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
            StubCustomerService.Stub(s => s.AddAsync(NewCustomer)).Return(Task.FromResult(ExpectedNewCustomer));
            StubAutoMapper.Stub(m => m.Map<CustomerDto, Customer>(NewCustomerDto)).Return(NewCustomer);

            ConfigureApi(HttpMethod.Post, "http://localhost/api/customers/");
            
        }

        #endregion

        #region Act

        protected override async void ArrangeAndAct()
        {
            Setup();
            Response = await CustomerControllerApi.PostCreateCustomersAsync(NewCustomerDto);
        }

        #endregion

        #region Assert

        [Test]
        public void CreateAsync_ItShouldCallTheAutoMapperEngine()
        {
            ArrangeAndAct();
            StubAutoMapper.AssertWasCalled(m => m.Map<CustomerDto, Customer>(NewCustomerDto));
        }
        //[Test]
        //public void CreateAsync_ItShouldCallTheCustomerService()
        //{
        //    ArrangeAndAct();
        //    StubCustomerService.AssertWasCalled(s => s.AddAsync(NewCustomer));
        //}

        #endregion
    }
}
