using Ninject.Modules;
using AutoMapper;
using Ninject.Web.Common;

namespace SpaJumpstart.WebServices.IoC.Modules
{
    public class RegisterAutoMapper : NinjectModule
    {
        public override void Load()
        {
            this.Bind<IMappingEngine>().ToConstant(Mapper.Engine).InRequestScope();
        }
    }
}