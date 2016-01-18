using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpaJumpstart.Domain.Entities
{
    public class Address : EntityBase, IValidatableObject
    {
        [Required]
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        [Required]
        public string AddressLine3 { get; set; }
        [Required]
        public string AddressLine4 { get; set; }

        [Required]
        public string Postcode { get; set; }
        public string Email { get; set; }

        [ForeignKey("Id")]
        public virtual Customer Customer { get; set; }

        #region Validation

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var results = new List<ValidationResult>();

            if (string.IsNullOrEmpty(AddressLine1))
            {
                results.Add(
                    new ValidationResult("AddressLine1 is required",
                        new[] { "AddressLine1" }));
            }
            if (string.IsNullOrEmpty(AddressLine3))
            {
                results.Add(
                    new ValidationResult("AddressLine3 is required",
                        new[] { "AddressLine3" }));
            }
            if (string.IsNullOrEmpty(AddressLine4))
            {
                results.Add(
                    new ValidationResult("AddressLine3 is required",
                        new[] { "AddressLine4" }));
            }
            if (string.IsNullOrEmpty(Postcode))
            {
                results.Add(
                    new ValidationResult("Postcode is required",
                        new[] { "Postcode" }));
            }
            return results;
        }

        #endregion
    }
}