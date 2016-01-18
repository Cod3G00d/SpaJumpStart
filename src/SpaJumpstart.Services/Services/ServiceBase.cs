using SpaJumpstart.Domain.Entities;
using SpaJumpstart.Domain.Services;
using SpaJumpstart.Domain.Data.UnitOfWork;
using SpaJumpstart.Domain.Data.Repositories;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace SpaJumpstart.Services.Services
{
    public class ServiceBase<TEntity> : IService<TEntity> where TEntity : EntityBase
    {
        public IUnitOfWork _unitOfWork { get; private set; }
        private readonly IRepositoryBase<TEntity> _repository;
        private bool _disposed;

        public ServiceBase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _repository = _unitOfWork.Repository<TEntity>();
        }

        #region Commands

        /// <summary>
        /// Add an Entity to the Data Repository
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task<TEntity> AddAsync(TEntity entity)
        {

            
_repository.Add(entity);
            await _unitOfWork.CommitAsync();

            return entity;
        }

        /// <summary>
        /// Add an Entity to the Data Repository
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public TEntity Add(TEntity entity)
        {
            _repository.Add(entity);
            _unitOfWork.Commit();

            return entity;
        }

        /// <summary>
        /// Delete an Entity from the Data Repository Asynchronously
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task DeleteAsync(TEntity entity)
        {
            _repository.Delete(entity);
            await _unitOfWork.CommitAsync();
        }


        /// <summary>
        /// Delete an Entity from the Data Repository
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public void Delete(TEntity entity)
        {
            _repository.Delete(entity);
            _unitOfWork.Commit();
        }


        /// <summary>
        /// Update an Entity in the Data Repository Asynchronously
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task UpdateAsync(TEntity entity)
        {
            _repository.Update(entity);
            await _unitOfWork.CommitAsync();
        }

        /// <summary>
        /// Update an Entity in the Data Repository 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public void Update(TEntity entity)
        {
            _repository.Update(entity);
            _unitOfWork.Commit();
        }

        #endregion

        #region Qureries

        /// <summary>
        /// Get all data asynchronously from the Data Repository for an Entity 
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }


        /// <summary>
        /// Get all data from the Data Repository for an Entity 
        /// </summary>
        /// <returns></returns>
        public IQueryable<TEntity> GetAll()
        {
            return _repository.GetAll();
        }

        /// <summary>
        /// Get all a single entity from the Data Repository asynchronously by it's Id
        /// </summary>
        /// <returns></returns>
        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        /// <summary>
        /// Get all a single entity from the Data Repository by it's Id
        /// </summary>
        /// <returns></returns>
        public TEntity GetById(int id)
        {
            return _repository.GetById(id);
        }

        #endregion

        #region Disposal

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                _unitOfWork.Dispose(true);
            }
            _disposed = true;
        }

        #endregion
    }
}
