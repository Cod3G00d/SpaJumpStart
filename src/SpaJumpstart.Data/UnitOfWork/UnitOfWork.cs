using System;
using System.Threading.Tasks;
using SpaJumpstart.Domain.Data.UnitOfWork;
using SpaJumpstart.Domain.Data.Repositories;
using SpaJumpstart.Domain.Entities;
using System.Collections;
using SpaJumpstart.Data.Repositories;
using SpaJumpstart.Data.Context.EF;

namespace SpaJumpstart.Data.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDbContext _dbContext;
        private bool _disposed;
        private Hashtable _repositories;
        
        public UnitOfWork(IDbContext context)
        {
            _dbContext = context;
        }

        public IRepositoryBase<TEntity> Repository<TEntity>() where TEntity : EntityBase
        {
            if (_repositories == null)
            {
                _repositories = new Hashtable();
            }

            var type = typeof(TEntity).Name;

            if (_repositories.ContainsKey(type))
            {
                return (IRepositoryBase<TEntity>)_repositories[type];
            }

            var repositoryType = typeof(RepositoryBase<>);

            _repositories.Add(type, Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _dbContext));

            return (IRepositoryBase<TEntity>)_repositories[type];
        }

        public void BeginTransaction()
        {
            _dbContext.BeginTransaction();
        }

        public int Commit()
        {
            return _dbContext.Commit();
        }

        public async Task<int> CommitAsync()
        {
            return await _dbContext.CommitAsync();
        }

        public void Rollback()
        {
            _dbContext.Rollback();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                _dbContext.Dispose();
                foreach (IDisposable repository in _repositories.Values)
                {
                    repository.Dispose();
                }
            }
            _disposed = true;
        }
    }
}
