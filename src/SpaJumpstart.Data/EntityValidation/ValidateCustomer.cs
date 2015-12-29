using SpaJumpstart.Domain.Entities;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;

namespace SpaJumpstart.Data.EntityValidation
{
    //Belt and Braces server-side validation
    public static class ValidateCustomer
    {
        public static List<DbValidationError> Validate(DbEntityEntry entityEntry, IDictionary<object, object> items)
        {
            var list = new List<DbValidationError>();

            if (entityEntry.CurrentValues.GetValue<string>("FirstName") == "")
            {
                list.Add(new DbValidationError("FirstName", "FirstName is required"));
            }
            if (entityEntry.CurrentValues.GetValue<string>("Surname") == "")
            {
                list.Add(new DbValidationError("Surname", "Surname is required"));
            }
            if (entityEntry.CurrentValues.GetValue<Address>("Address") == null)
            {
                list.Add(new DbValidationError("Address", "Address is required"));
            }
            return list;
        }
    }
}
