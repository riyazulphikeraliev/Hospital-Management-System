using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Contracts;
using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class MedicalRecordsRepo:IMedicalRecordsDAL
    {
        private readonly HospitalManagementSystemWebapiContext _context;

        public MedicalRecordsRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }

        public async Task<List<MedicalRecord>> GetMedicalRecordsAsync(int? id, int? pid, int? did, DateTime? date, string? diagnosis, string? prescription, string? testresult,int?specid, string? specname, string? docname, string? patname)
        {
            try
            {
                string sqlquery = "USP_MedicalRecords_GetMedicalRecords @ID, @PatientID, @DoctorID, @Date, @Diagnosis, @Prescription, @TestResult,@SpecializationID, @SpecializationName, @DoctorFullName, @PatientFullName";

                var idParam = id.HasValue ? new SqlParameter("@ID", id) : new SqlParameter("@ID", DBNull.Value);
                var patientIdParam = pid.HasValue ? new SqlParameter("@PatientID", pid) : new SqlParameter("@PatientID", DBNull.Value);
                var doctorIdParam = did.HasValue ? new SqlParameter("@DoctorID", did) : new SqlParameter("@DoctorID", DBNull.Value);
                var dateParam = date.HasValue ? new SqlParameter("@Date", date) : new SqlParameter("@Date", DBNull.Value);
                var diagnosisParam = string.IsNullOrEmpty(diagnosis) ? new SqlParameter("@Diagnosis", DBNull.Value) : new SqlParameter("@Diagnosis", diagnosis);
                var prescriptionParam = string.IsNullOrEmpty(prescription) ? new SqlParameter("@Prescription", DBNull.Value) : new SqlParameter("@Prescription", prescription);
                var testResultParam = string.IsNullOrEmpty(testresult) ? new SqlParameter("@TestResult", DBNull.Value) : new SqlParameter("@TestResult", testresult);
                var specIdParam = specid.HasValue ? new SqlParameter("@SpecializationID", specid) : new SqlParameter("@SpecializationID", DBNull.Value);

                var specNameParam = string.IsNullOrEmpty(specname) ? new SqlParameter("@SpecializationName", DBNull.Value) : new SqlParameter("@SpecializationName", specname);
                var docNameParam = string.IsNullOrEmpty(docname) ? new SqlParameter("@DoctorFullName", DBNull.Value) : new SqlParameter("@DoctorFullName", docname);
                var patNameParam = string.IsNullOrEmpty(patname) ? new SqlParameter("@PatientFullName", DBNull.Value) : new SqlParameter("@PatientFullName", patname);

                return await _context.MedicalRecords.FromSqlRaw(sqlquery, idParam, patientIdParam, doctorIdParam, dateParam, diagnosisParam, prescriptionParam, testResultParam, specIdParam, specNameParam, docNameParam, patNameParam).ToListAsync();
            }
            catch (Exception ex)
            {
                // Handle exception (log, throw, etc.)
                throw new Exception($"Error in GetMedicalRecordsAsync: {ex.Message}");
            }
        }

        public async Task<bool> InsertUpdateMR(MedicalRecord record, string username)
        {
            try
            {
                if (record != null)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_MedicalRecords_Insert_Update @ID={record.Id},@PatientID={record.PatientId},@DoctorID={record.DoctorId},@Date={record.Date},@Diagnosis={record.Diagnosis},@Prescription={record.Prescription},@TestResult={record.TestResults},@CreatedBy={username},@UpdatedBy={username}");
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
                // Handle exception (log, throw, etc.)
                throw new Exception($"Error in InsertUpdateMR: {ex.Message}");
            }
        }

        public async Task<bool> DeleteMR(int? id, string? patname, string? docname, string? diagnosis)
        {
            try
            {
                if (id != null || !string.IsNullOrEmpty(patname) || !string.IsNullOrEmpty(docname) || !string.IsNullOrEmpty(diagnosis))
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_MedicalRecords_DeleteMedicalRecord @ID = {id}, @PatientFullName = {patname}, @DoctorFullName= {docname}, @Diagnosis = {diagnosis}");
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
                // Handle exception (log, throw, etc.)
                throw new Exception($"Error in DeleteMR: {ex.Message}");
            }
        }
    }
}
