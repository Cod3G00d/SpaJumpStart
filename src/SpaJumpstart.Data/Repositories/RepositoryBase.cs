using SpaJumpstart.Data.Context.EF;
using SpaJumpstart.Domain.Data.Repositories;
using SpaJumpstart.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SpaJumpstart.Data.Repositories
{
    public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> 
        where TEntity : EntityBase
    {
        private readonly IDbContext DbContext;
        private readonly IDbSet<TEntity> DbSet;
        private bool _disposed;

        private SpaDbContext dataContext;

        public RepositoryBase(IDbContext context)
        {
            DbContext = context;
            this.DbSet = DbContext.Set<TEntity>();
        }

        //#region Properties
        //protected IDbContextFactory DbFactory
        //{
        //    get;
        //    private set;
        //}

        //protected SpaDbContext DbContext
        //{
        //    get { return dataContext ?? (dataContext = DbFactory.Create()); }
        //}

        //public RepositoryBase(IDbContextFactory dbFactory)
        //{
        //    DbFactory = dbFactory;
        //}

        //#endregion

        /// <summary>
        /// Generic method to check if entity exists
        /// </summary>
        /// <param name="primaryKey"></param>
        /// <returns></returns>
        public bool Exists(object primaryKey)
        {
            return DbSet.Find(primaryKey) != null;
        }

        #region Queries

        /// <summary>
        /// generic Get All method for Entities Asynchronously
        /// </summary>
        /// <returns></returns>
        public async Task<List<TEntity>> GetAllAsync()
        {
            return await DbSet.ToListAsync();
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await DbSet.FirstOrDefaultAsync(t => t.Id == id);
        }

        /// <summary>
        /// generic Get All method for Entities
        /// </summary>
        /// <returns></returns>
        public IQueryable<TEntity> GetAll()
        {
            return DbSet;
        }

        /// <summary>
        /// Generic get method on the basis of id for Entities.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public TEntity GetById(int id)
        {
            return GetAll().FirstOrDefault(x => x.Id == id);
        }

        /// <summary>
        /// Generic get method on the basis of id for Entities.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<List<TEntity>> AllIncludingAsync(params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> query = DbSet;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return await query.ToListAsync();
        }

        public virtual IQueryable<TEntity> AllIncluding(params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> query = DbSet;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        /// <summary>
        /// generic Get All method for Entities
        /// </summary>
        /// <returns></returns>
        //public IQueryable<TEntity> GetAllLazy()
        //{
        //    return DbSet.Include("Address");
        //}

        /// <summary>
        /// generic Get All method for Entities
        /// </summary>
        /// <returns></returns>
        //public IEnumerable<TEntity> GetAllEager()
        //{
        //    return DbSet.Include("Address").ToList();
        //}

        #endregion

        #region Search Queries

        public virtual IQueryable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate)
        {
            return DbContext.Set<TEntity>().Where(predicate);
        }

        #endregion

        #region Commands

        /// <summary>
        /// generic Insert method for the entities
        /// </summary>
        /// <param name="entity"></param>
        public void Add(TEntity entity)
        {
            DbContext.SetAsAdded(entity);
            DbSet.Add(entity);
        }

        /// <summary>
        /// Generic update method for the entities
        /// </summary>
        /// <param name="entityToUpdate"></param>
        public void Update(TEntity entityToUpdate)
        {
            DbContext.SetAsModified(entityToUpdate);
        }

        /// <summary>
        /// Generic Delete method for the entities by Id
        /// </summary>
        /// <param name="id"></param>
        public void DeleteById(int id)
        {
            TEntity entityToDelete = DbSet.Find(id);
            Delete(entityToDelete);
        }

        /// <summary>
        /// Generic Delete method for the entities
        /// </summary>
        /// <param name="entityToDelete"></param>
        public void Delete(TEntity entityToDelete)
        {
            DbContext.SetAsDeleted(entityToDelete);
            DbSet.Remove(entityToDelete);
        }

        #endregion

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                DbContext.Dispose();
            }
            _disposed = true;
        }
    }
}