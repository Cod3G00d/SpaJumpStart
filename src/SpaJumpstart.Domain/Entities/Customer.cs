using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpaJumpstart.Domain.Entities
{
    /// <summary>
    /// Customer Details
    /// </summary>
    public class Customer : EntityBase, IValidatableObject
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string Surname { get; set; }
        public string Telephone { get; set; }
        public string MobilePhone { get; set; }
        public bool Active { get; set; }
        public DateTime InceptionDate { get; set; }

        public string ApplicationUserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }

        [ForeignKey("Id")]
        public virtual Address Address { get; set; }

        //This adds a rowversion id to the table for concurrency
        //[Timestamp]
        //public byte[] RowVersion { get; set; }

        #region Validation
        //Belt and Braces validation

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var results = new List<ValidationResult>();
            if (FirstName.Contains("\n"))
            {
                results.Add(
                    new ValidationResult("Newline character is illegal",
                        new[] { "FirstName" }));
            }
            if (Surname.Contains("\n"))
            {
                results.Add(
                    new ValidationResult("Newline character is illegal",
                        new[] { "Surname" }));
            }

            if (string.IsNullOrEmpty(FirstName))
            {
                results.Add(
                    new ValidationResult("FirstName is required",
                        new[] { "FirstName" }));
            }
            if (string.IsNullOrEmpty(Surname))
            {
                results.Add(
                    new ValidationResult("Surname is required",
                        new[] { "Surname" }));
            }
            if (Address == null)
            {
                results.Add(
                    new ValidationResult("Address is required",
                        new[] { "Address" }));
            }
            return results;
        }

        #endregion
    }
}

