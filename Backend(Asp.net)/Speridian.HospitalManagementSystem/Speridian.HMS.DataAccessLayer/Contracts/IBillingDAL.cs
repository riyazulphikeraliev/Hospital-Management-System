using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Contracts
{
    public interface IBillingDAL
    {
        public Task<List<Billing>> GetBillingRecordsAsync(int? id, string? patientname, string? doctorname, DateTime? billDate, decimal? totalAmount, string? paymentStatus, int? patid, int? docid);

        public Task<bool> InsertUpdateBilling(Billing bill, string username);

        public  Task<bool> DeleteBilling(int? id, string? patientFullName, string? doctorFullName, DateTime? billDate, decimal? totalAmount, string? paymentStatus);
    }
}
