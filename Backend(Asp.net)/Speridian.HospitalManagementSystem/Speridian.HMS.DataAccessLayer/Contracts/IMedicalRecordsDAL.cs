using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Contracts
{
    public interface IMedicalRecordsDAL
    {
        public  Task<List<MedicalRecord>> GetMedicalRecordsAsync(int? id, int? pid, int? did, DateTime? date, string? diagnosis, string? prescription, string? testresult, int? specid,string? specname, string? docname, string? patname);

        public Task<bool> InsertUpdateMR(MedicalRecord record, string username);

        public Task<bool> DeleteMR(int? id, string? patname, string? docname, string? diagnosis);
    }
}
