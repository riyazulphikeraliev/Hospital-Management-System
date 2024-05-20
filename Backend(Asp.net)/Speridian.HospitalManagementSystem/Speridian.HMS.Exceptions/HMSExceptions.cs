using System.Runtime.Serialization;

namespace Speridian.HMS.Exceptions
{
    public class HMSExceptions : ApplicationException
    {
        public HMSExceptions()
        {
        }

        public HMSExceptions(string? message) : base(message)
        {
        }

        public HMSExceptions(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected HMSExceptions(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
