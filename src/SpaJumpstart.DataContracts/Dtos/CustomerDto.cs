namespace SpaJumpstart.DataContracts.Dtos
{
    public class CustomerDto : DtoBase
    {
        public CustomerDto()
        {

        }

        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Telephone { get; set; }
        public string MobilePhone { get; set; }
        public bool Active { get; set; }
        public AddressDto Address  { get; set; }
    }
}
