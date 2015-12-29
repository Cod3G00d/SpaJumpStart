using System;

namespace SpaJumpstart.Domain.Logging
{
    public interface ILogger
    {
        void Log(string message);
        void Log(Exception ex);
    }
}
