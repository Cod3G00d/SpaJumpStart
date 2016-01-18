using SpaJumpstart.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaJumpstart.Domain.Data.Repositories
{
    public interface IRepositoryBase<TEntity> : IDisposable where TEntity : EntityBase
    {
        void Add(TEntity entity);
        void DeleteById(int id);
        void Delete(TEntity entityToDelete);
        void Update(TEntity entityToUpdate);

        //IQueryable<TEntity> GetAllLazy();
        //IEnumerable<TEntity> GetAllEager();

        IQueryable<TEntity> GetAll();
        Task<List<TEntity>> GetAllAsync();

        Task<TEntity> GetByIdAsync(int id);
        TEntity GetById(int id);
    }
}