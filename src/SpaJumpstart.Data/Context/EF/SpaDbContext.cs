using System;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity.Validation;

using System.Threading.Tasks;
using System.Collections.Generic;

using SpaJumpstart.Domain.Entities;
using SpaJumpstart.Domain.Logging;
using SpaJumpstart.Data.EntityValidation;
using System.Linq;
using SpaJumpstart.Data.Configurations;
using Microsoft.AspNet.Identity.EntityFramework;

namespace SpaJumpstart.Data.Context.EF
{
    public class SpaDbContext : IdentityDbContext<ApplicationUser>, IDbContext
    {

        private ObjectContext _objectContext;
        private DbTransaction _transaction;
        private static readonly object Lock = new object();
        private static bool _databaseIsInitialized;

        /// <summary>
        /// Constructs a new context instance using the given string as the name or connection
        /// string for the database to which a connection will be made.  
        /// </summary>
        public SpaDbContext()
            : base("SpaAppDbConnection")
        {
            //Database.SetInitializer<SpaDbContext>(null);
            //Database.SetInitializer(new SpaDbInitializer());

        }

        /// <summary>
        /// Constructs a new context instance using the given string as the name or connection
        /// string for the database to which a connection will be made.  See the class
        /// remarks for how this is used to create a connection.
        /// </summary>
        /// <param name="nameOrConnectionString">Either the database name or a connection string.</param>
        /// 
        public SpaDbContext(string nameOrConnectionString, ILogger logger)
            : base(nameOrConnectionString)
        {
            if (logger != null)
            {
                Database.Log = logger.Log;
            }

            if (_databaseIsInitialized)
            {
                return;
            }
            lock (Lock)
            {
                if (!_databaseIsInitialized)
                {
                    Database.SetInitializer(new SpaDbInitializer());
                    _databaseIsInitialized = true;
                }
            }
        }

        public static SpaDbContext Create()
        {
            return new SpaDbContext(nameOrConnectionString: "SpaAppDbConnection", logger: null);
        }


        #region DbSets

        public IDbSet<Customer> Customers { get; set; }
        public IDbSet<Error> ErrorSet { get; set; }

        #endregion

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            SetupConventions(modelBuilder);

            modelBuilder.Properties<int>()
                .Where(p => p.ReflectedType.Name == "Id")
                .Configure(p => p.IsKey());

            modelBuilder.Properties<string>()
                .Configure(p => p.HasColumnType("varchar"));

            modelBuilder.Properties<string>()
                .Configure(p => p.HasMaxLength(100));

            SetupEntityConfigurations(modelBuilder);

        }

        private static void SetupEntityConfigurations(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new CustomerConfiguration());
            modelBuilder.Configurations.Add(new AddressConfiguration());
        }

        private static void SetupConventions(DbModelBuilder modelBuilder)
        {
            // Custom convention for a Primary Key with a Filter on int values
            // Set all fields named "Id" to be the Primary Key by default, but only if they are an int on the entity
            // N.B. IsKey() method is additive so specifying multiples creates "composite" keys, but you
            // must call the HasColumnOrder() method to define the order

            //Here we are disabling some of the default model conventions self explanatory really, as not required
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

        }


        #region IDbContext and public methods

        public new IDbSet<TEntity> Set<TEntity>() where TEntity : EntityBase
        {
            return base.Set<TEntity>();
        }

        public void SetAsAdded<TEntity>(TEntity entity) where TEntity : EntityBase
        {
            UpdateEntityState(entity, EntityState.Added);
        }

        public void SetAsDeleted<TEntity>(TEntity entity) where TEntity : EntityBase
        {
            UpdateEntityState(entity, EntityState.Deleted);
        }

        public void SetAsModified<TEntity>(TEntity entity) where TEntity : EntityBase
        {
            UpdateEntityState(entity, EntityState.Modified);
        }

        public void BeginTransaction()
        {
            this._objectContext = ((IObjectContextAdapter)this).ObjectContext;
            if (_objectContext.Connection.State == ConnectionState.Open)
            {
                return;
            }
            _objectContext.Connection.Open();
            _transaction = _objectContext.Connection.BeginTransaction();
        }

        public int Commit()
        {
            try
            {
                SetInceptionDate();

                BeginTransaction();
                var saveChanges = SaveChanges();
                _transaction.Commit();

                return saveChanges;
            }
            catch (Exception)
            {
                Rollback();
                throw;
            }
            finally
            {
                Dispose();
            }
        }

        public async Task<int> CommitAsync()
        {
            try
            {
                SetInceptionDate();

                BeginTransaction();
                var saveChangesAsync = await SaveChangesAsync();
                _transaction.Commit();

                return saveChangesAsync;
            }
            catch (Exception)
            {
                Rollback();
                throw;
            }
            finally
            {
                Dispose();
            }
        }

        public void Rollback()
        {
            _transaction.Rollback();
        }

        #endregion

        #region private methods

        private void UpdateEntityState<TEntity>(TEntity entity, EntityState entityState) where TEntity : EntityBase
        {
            var dbEntityEntry = GetDbEntityEntrySafely(entity);
            dbEntityEntry.State = entityState;
        }

        private DbEntityEntry GetDbEntityEntrySafely<TEntity>(TEntity entity) where TEntity : EntityBase
        {
            var dbEntityEntry = base.Entry<TEntity>(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                Set<TEntity>().Attach(entity);
            }
            return dbEntityEntry;
        }

        private void SetInceptionDate()
        {
            foreach (var entry in ChangeTracker.Entries()
                .Where(entry => entry.Entity.GetType().GetProperty("InceptionDate") != null))
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Property("InceptionDate").CurrentValue = DateTime.Now;
                }
                if (entry.State == EntityState.Modified)
                {
                    entry.Property("InceptionDate").IsModified = false;
                }
            }
        }

        #endregion

        #region Customer Validation

        //Use this to add server-side validation
        protected override DbEntityValidationResult ValidateEntity(DbEntityEntry entityEntry, IDictionary<object, object> items)
        {
            //do the base DataAnnotations/fluent validation mapping
            var result = base.ValidateEntity(entityEntry, items);

            List<DbValidationError> checkedItems;

            if (entityEntry.Entity == Customers)
            {
                checkedItems = ValidateCustomer.Validate(entityEntry, items);
                if (checkedItems != null)
                {
                    foreach (var item in checkedItems)
                    {
                        result.ValidationErrors.Add(item);
                    }
                }
            }

            return result;
        }

        #endregion
    }
}

