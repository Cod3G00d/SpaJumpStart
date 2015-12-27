using SpaJumpstart.Domain.Data.Repositories;
using SpaJumpstart.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace SpaJumpstart.Domain.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IRepositoryBase<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
        void BeginTransaction();

        int Commit();
        Task<int> CommitAsync();
        void Rollback();
        void Dispose(bool disposing);
    }
}
