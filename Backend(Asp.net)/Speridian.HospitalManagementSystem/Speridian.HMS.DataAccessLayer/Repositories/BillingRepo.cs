using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Contracts;
using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class BillingRepo : IBillingDAL
    {
        private readonly HospitalManagementSystemWebapiContext _context;

        public BillingRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }

        public async Task<List<Billing>> GetBillingRecordsAsync(int? id, string? patientname, string? doctorname, DateTime? billDate, decimal? totalAmount, string? paymentStatus, int? patid, int? docid)
        {
            try
            {
                string sqlquery = "USP_Billing_GetBillings @ID,@PatientID,@DoctorID ,@PatientFullName, @DoctorFullName, @BillDate, @TotalAmount, @PaymentStatus";

                var idParam = id.HasValue ? new SqlParameter("@ID", id) : new SqlParameter("@ID", DBNull.Value);
                var patidparam = patid.HasValue ? new SqlParameter("@PatientID", patid) : new SqlParameter("@PatientID", DBNull.Value);
                var docidparam = docid.HasValue ? new SqlParameter("@DoctorID", docid) : new SqlParameter("@DoctorID", DBNull.Value);
                var patnameParam = string.IsNullOrEmpty(patientname) ? new SqlParameter("@PatientFullName", DBNull.Value) : new SqlParameter("@PatientFullName", patientname);
                var doctornameParam = string.IsNullOrEmpty(doctorname) ? new SqlParameter("@DoctorFullName", DBNull.Value) : new SqlParameter("@DoctorFullName", doctorname);
                var billDateParam = billDate.HasValue ? new SqlParameter("@BillDate", billDate) : new SqlParameter("@BillDate", DBNull.Value);
                var totalAmountParam = totalAmount.HasValue ? new SqlParameter("@TotalAmount", totalAmount) : new SqlParameter("@TotalAmount", DBNull.Value);
                var paymentStatusParam = string.IsNullOrEmpty(paymentStatus) ? new SqlParameter("@PaymentStatus", DBNull.Value) : new SqlParameter("@PaymentStatus", paymentStatus);

                return await _context.Billings.FromSqlRaw(sqlquery, idParam,patidparam,docidparam, patnameParam, doctornameParam, billDateParam, totalAmountParam, paymentStatusParam).ToListAsync();
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                throw new Exception($"Error in GetBillingRecordsAsync: {ex.Message}");
            }
        }
        public async Task<List<BillingDataForGraphsView>> GetBillsForGraph( DateTime? StartDate, DateTime? EndDate)
        {
            try
            {
                string sqlquery = "USP_Billing_GetBillingDataForGraphs @StartDate, @EndDate";

               
                var billStartDateParam = StartDate.HasValue ? new SqlParameter("@StartDate", StartDate) : new SqlParameter("@StartDate", DBNull.Value);
                var billEndDateParam = EndDate.HasValue ? new SqlParameter("@EndDate", EndDate) : new SqlParameter("@EndDate", DBNull.Value);


                return await _context.BillingDataForGraphsViews.FromSqlRaw(sqlquery, billStartDateParam,billEndDateParam).ToListAsync();
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                throw new Exception($"Error in GetBillingRecordsAsync: {ex.Message}");
            }
        }

        public async Task<bool> InsertUpdateBilling(Billing bill, string username)
        {
            try
            {
                if (bill != null)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Billing_Insert_Update @BillingID={bill.Id}, @PatientID={bill.PatientId}, @DoctorID={bill.DoctorId}, @BillDate={bill.BillDate}, @TotalAmount={bill.TotalAmount}, @PaymentStatus={bill.PaymentStatus},@CreatedBy={username},@UpdatedBy={username}");
                    return true;
                }
                else
                {
                    // Handle invalid input
                    return false;
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                throw new Exception($"Error in InsertUpdateBilling: {ex.Message}");
            }
        }

        public async Task<bool> DeleteBilling(int? id, string? patientFullName, string? doctorFullName, DateTime? billDate, decimal? totalAmount, string? paymentStatus)
        {
            try
            {
                if (id.HasValue || !string.IsNullOrEmpty(patientFullName) || !string.IsNullOrEmpty(doctorFullName) || billDate.HasValue || totalAmount.HasValue || !string.IsNullOrEmpty(paymentStatus))
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Billing_DeleteBill @BillingID={id}, @PatientFullName={patientFullName}, @DoctorFullName={doctorFullName}, @BillDate={billDate}, @TotalAmount={totalAmount}, @PaymentStatus={paymentStatus}");
                    return true;
                }
                else
                {
                    // Handle invalid input
                    return false;
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                throw new Exception($"Error in DeleteBilling: {ex.Message}");
            }
        }
    }
}
