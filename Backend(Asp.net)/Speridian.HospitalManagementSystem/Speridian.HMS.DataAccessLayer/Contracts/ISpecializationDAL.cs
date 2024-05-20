using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Contracts
{
    public interface ISpecializationDAL
    {
        public  Task<List<Specialization>> GetSpecialization(int? id, string? name);

        public  Task<bool> InsertUpdate(Specialization spec, string username);
        public  Task<bool> DeleteSpecialization(int? id, string? name);
    }
}
