using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.Exception
{
    public class HMSExceptions : ApplicationException
    {
        public HMSExceptions()
        {
        }

        public HMSExceptions(string? message) : base(message)
        {
        }

        public HMSExceptions(string? message, System.Exception? innerException) : base(message, innerException)
        {
        }

        protected HMSExceptions(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
