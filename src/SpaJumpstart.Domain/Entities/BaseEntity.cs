using System.ComponentModel.DataAnnotations;

namespace SpaJumpstart.Domain.Entities
{
    public abstract class EntityBase : IEntity
    {
        [Key]
        public int Id { get; set; }
    }
 }
