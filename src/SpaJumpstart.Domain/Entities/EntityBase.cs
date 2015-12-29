using System.ComponentModel.DataAnnotations;

namespace SpaJumpstart.Domain.Entities
{
    public abstract class EntityBase : IEntityBase
    {
        [Key]
        public int Id { get; set; }
    }
 }
