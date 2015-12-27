using SpaJumpstart.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SpaJumpstart.Domain.Data.Repositories
{
    public interface IRepositoryBase<TEntity> : IDisposable where TEntity : BaseEntity
    {
        void Insert(TEntity entity);
        void DeleteById(int id);
        void Delete(TEntity entityToDelete);
        void Update(TEntity entityToUpdate);

        Task<List<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(int id);

        IEnumerable<TEntity> GetAll();
        //IQueryable<TEntity> GetAllLazy();
        //IEnumerable<TEntity> GetAllEager();

        TEntity GetById(int id);

        void Dispose();
    }
}