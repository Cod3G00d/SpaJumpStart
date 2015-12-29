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

            Property(c => c.Id).HasColumnName("AddressId")
                .HasColumnOrder(1);

            //Foreign Key - Address has to be ICollection<TEntity>, one-to-one relationship
            HasRequired(ad => ad.Customer)
                .WithRequiredDependent(c => c.Address);

            #endregion

            Property(c => c.AddressLine1)
                .IsRequired()
                .HasMaxLength(150)
                .HasColumnName("AddressLine1")
                .HasColumnOrder(2)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(c => c.AddressLine2)
                .IsOptional()
                .HasMaxLength(150)
                .HasColumnName("AddressLine2")
                .HasColumnOrder(3)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(c => c.AddressLine3)
                .IsRequired()
                .HasMaxLength(150)
                .HasColumnName("Town")
                .HasColumnOrder(4)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(c => c.AddressLine4)
                .IsOptional()
                .HasMaxLength(150)
                .HasColumnName("County")
                .HasColumnOrder(5)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(c => c.Postcode)
                .IsRequired()
                .HasMaxLength(11)
                .HasColumnName("Postcode")
                .HasColumnOrder(6)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(c => c.Email)
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
