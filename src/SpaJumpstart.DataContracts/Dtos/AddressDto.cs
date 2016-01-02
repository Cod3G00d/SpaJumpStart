namespace SpaJumpstart.DataContracts.Dtos
{
    public class AddressDto : DtoBase
    {
        public AddressDto()
        {

        }

        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public string AddressLine4 { get; set; }

        public string Postcode { get; set; }
        public string Email { get; set; }
    }
}
