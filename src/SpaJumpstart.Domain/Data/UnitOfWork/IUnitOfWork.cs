using SpaJumpstart.Domain.Data.Repositories;
using SpaJumpstart.Domain.Entities;
using System.Threading.Tasks;

namespace SpaJumpstart.Domain.Data.UnitOfWork
{
    public interface IUnitOfWork 
    {
        IRepositoryBase<TEntity> Repository<TEntity>() where TEntity : EntityBase;
        void BeginTransaction();

        int Commit();
        Task<int> CommitAsync();

        void Rollback();
        void Dispose(bool disposing);
    }
}
