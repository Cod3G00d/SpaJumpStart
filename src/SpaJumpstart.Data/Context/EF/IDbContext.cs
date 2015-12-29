using SpaJumpstart.Domain.Entities;
using System;
using System.Data.Entity;
using System.Threading.Tasks;

namespace SpaJumpstart.Data.Context.EF
{
    public interface IDbContext : IDisposable
    {
        IDbSet<TEntity> Set<TEntity>() where TEntity : EntityBase;

        void SetAsAdded<TEntity>(TEntity entity) where TEntity : EntityBase;

        void SetAsModified<TEntity>(TEntity entity) where TEntity : EntityBase;

        void SetAsDeleted<TEntity>(TEntity entity) where TEntity : EntityBase;

        void BeginTransaction();

        int Commit();
        Task<int> CommitAsync();

        void Rollback();
    }
}
