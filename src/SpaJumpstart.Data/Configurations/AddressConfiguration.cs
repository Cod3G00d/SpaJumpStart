using SpaJumpstart.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace SpaJumpstart.Data.Configurations
{ 
    public class AddressConfiguration : EntityTypeConfiguration<Address>
    {
        public AddressConfiguration()
        {
            #region PK and FKS

            Property(c => c.Id).HasColumnName("CustomerId")
                .HasColumnOrder(1);

            //Foreign Key - Address has to be ICollection<TEntity>, one-to-one relationship
            //HasRequired(a => a.Customer)
            //    .WithRequiredDependent(c => c.Address);

            #endregion

            Property(a => a.AddressLine1)
                .IsRequired()
                .HasMaxLength(150)
                .HasColumnName("AddressLine1")  
                .HasColumnOrder(2)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(a => a.AddressLine2)
                .IsOptional()
                .HasMaxLength(150)
                .HasColumnName("AddressLine2")
                .HasColumnOrder(3)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(a => a.AddressLine3)
                .IsRequired()
                .HasMaxLength(150)
                .HasColumnName("Town")
                .HasColumnOrder(4)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(a => a.AddressLine4)
                .IsOptional()
                .HasMaxLength(150)
                .HasColumnName("County")
                .HasColumnOrder(5)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(a => a.Postcode)
                .IsRequired()
                .HasMaxLength(11)
                .HasColumnName("Postcode")
                .HasColumnOrder(6)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(a => a.Email)
                .IsRequired()
                .HasMaxLength(200)
                .HasColumnName("Email")
                .HasColumnOrder(7)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            ToTable("Address");
        }
    }
}
