using System.Reflection;

namespace SpaJumpstart.WebServices.AssemblyReferences
{
    public static class ReferencedAssemblies
    {
        public static Assembly Domain
        {
            get
            {
                return Assembly.Load("SpaJumpstart.Domain");
            }
        }

        public static Assembly Services
        {
            get { return Assembly.Load("SpaJumpstart.Services"); }
        }

        public static Assembly Repositories
        {
            get { return Assembly.Load("SpaJumpstart.Data"); }
        }

        public static Assembly Dto
        {
            get
            {
                return Assembly.Load("SpaJumpstart.DataContracts");
            }
        }
    }
}