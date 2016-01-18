using SpaJumpstart.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpaJumpstart.Data.Configurations
{
    public class CustomerConfiguration : EntityBaseConfiguration<Customer>
    {
        public CustomerConfiguration()
        {
            Property(c => c.Id).HasColumnName("CustomerId")
                .HasColumnOrder(1);
            
            //Foreign Key Address one-to-one

            HasRequired(a => a.Address) // Must have an address in the relationship
                .WithRequiredPrincipal(a => a.Customer) // Create inverse relationship
                                                          //.Map(s => s.MapKey("AddressId"))
                .WillCascadeOnDelete();


            Property(c => c.FirstName)
                .IsRequired()
                .HasMaxLength(150)
                .HasColumnName("Firstname")
                .HasColumnOrder(2)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(c => c.Surname)
                .IsRequired()
                .HasMaxLength(150)
                .HasColumnName("Surname")
                .HasColumnOrder(3)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(c => c.MobilePhone)
                .HasMaxLength(10)
                .HasColumnName("MobilePhone")
                .HasColumnOrder(4)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(c => c.Telephone)
                .HasMaxLength(20)
                .HasColumnName("Telephone")
                .HasColumnOrder(5)
                .HasColumnType("varchar")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(c => c.InceptionDate)
                .HasColumnName("InceptionDate")
                .HasColumnOrder(6)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            //This adds a sql rowversion to the table for -optimistic concurrency
            Property(c => c.RowVersion)
                //.IsConcurrencyToken()
                .IsRequired()
                .IsRowVersion()
                .HasColumnOrder(7);

            Property(c => c.Active)
                //.IsOptional()
                .HasColumnOrder(8)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            //Property(c => c.ApplicationUserId)
            //    .IsOptional()
            //    .HasMaxLength(255)
            //    .HasColumnType("varchar")
            //    .HasColumnOrder(9)
            //    .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            ToTable("Customer");
        }
    }
}