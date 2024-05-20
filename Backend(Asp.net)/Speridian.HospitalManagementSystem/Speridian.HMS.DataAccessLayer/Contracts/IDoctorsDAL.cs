using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Contracts
{
    public interface IDoctorsDAL
    {
        public  Task<List<Doctor>> GetDoctorsAsync(int? id, string? FirstName, string? LastName, string? SpecializationName,int?specId, int? userId);
        public Task<bool> InsertUpdate(Doctor doc, string username);
        public  Task<bool> DeleteDoctor(int id);
    }
}
