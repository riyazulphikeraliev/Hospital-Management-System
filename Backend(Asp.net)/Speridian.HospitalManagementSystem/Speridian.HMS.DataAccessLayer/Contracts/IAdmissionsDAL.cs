using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Contracts
{
    public interface IAdmissionsDAL
    {
        public  Task<List<Admission>> GetAdmissionsAsync(int? admissionId, DateTime? admissionDate, DateTime? dischargeDate, string wardType, string patientFullName, string doctorFullName, int? patid, int? docid);

        public Task<bool> InsertUpdateAdmission(Admission admission,string username);

        public  Task<bool> DeleteAdmission(int? admissionId, string? patientFullName, string? doctorFullName, DateTime? admissionDate, DateTime? dischargeDate, string? wardType);

    }
}
