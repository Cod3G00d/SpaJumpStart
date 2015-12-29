using System;

namespace SpaJumpstart.Domain.Entities
{
    public class Error : EntityBase
    {
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
