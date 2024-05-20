using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Contracts
{
    public interface IPatientDAL
    {
        public Task<List<Patient>> GetPatients(int? id, string? firstname, string? lastname, DateTime dob, string? gender, string? number, string? address, int? userId);
        public Task<bool> DeletePatient(int? id, string fname, string lname);

        public Task<bool> InsertUpdatePatient(Patient patient, string username);

    }
}
