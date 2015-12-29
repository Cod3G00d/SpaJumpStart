using SpaJumpstart.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaJumpstart.Domain.Services
{
    public interface IService<TEntity> : IDisposable where TEntity : EntityBase
    {
        Task<List<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(int id);

        IQueryable<TEntity> GetAll();
        TEntity GetById(int id);

        Task<TEntity> AddAsync(TEntity entity);
        TEntity Add(TEntity entity);

        Task UpdateAsync(TEntity entity);
        void Update(TEntity entity);

        Task DeleteAsync(TEntity entity);
        void Delete(TEntity entity);
    }
}