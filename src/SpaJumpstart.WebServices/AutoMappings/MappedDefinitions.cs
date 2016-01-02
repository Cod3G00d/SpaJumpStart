

using AutoMapper;
using SpaJumpstart.DataContracts.Dtos;
using SpaJumpstart.Domain.Entities;
using SpaJumpstart.WebServices.AssemblyReferences;
using System;
using System.Linq;

namespace SpaJumpstart.WebServices.Mappings.AutoMappings
{
    public class MappedDefinitions
    {
        public void Init()
        {
            RegisterMappings();
        }

        private void RegisterMappings()
        {
            var entities =
                ReferencedAssemblies.Domain.
                    GetTypes().Where(x => typeof(IEntity).IsAssignableFrom(x)).ToList();

            var dtos =
                ReferencedAssemblies.Dto.
                    GetTypes().Where(x => typeof(IDto).IsAssignableFrom(x)).ToList();

            foreach (var entity in entities)
            {
                if (Mapper.GetAllTypeMaps().FirstOrDefault(m => m.DestinationType == entity || m.SourceType == entity) == null)
                {
                    var matchingDto =
                        dtos.FirstOrDefault(x => x.Name.Replace("Dto", string.Empty).Equals(entity.Name, StringComparison.InvariantCultureIgnoreCase));

                    if (matchingDto != null)
                    {
                        Mapper.CreateMap(entity, matchingDto);
                        Mapper.CreateMap(matchingDto, entity);
                    }
                }
            }

        }
    }
}