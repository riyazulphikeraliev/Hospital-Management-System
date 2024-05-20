using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Contracts;
using Speridian.HMS.DataAccessLayer.Models;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class AdmissionsRepo :IAdmissionsDAL
    {
        private readonly HospitalManagementSystemWebapiContext _context;
        public AdmissionsRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }

        public async Task<List<Admission>> GetAdmissionsAsync(int? admissionId, DateTime? admissionDate, DateTime? dischargeDate, string? wardType, string? patientFullName, string? doctorFullName, int? patid, int? docid)
        {
            try
            {
                string sqlQuery = "USP_Admissions_GetAdmissions @AdmissionID,@PatientID,@DoctorID, @PatientFullName, @DoctorFullName,@AdmissionDate, @DischargeDate, @WardType ";


                var admissionIdParam = admissionId.HasValue ? new SqlParameter("@AdmissionID", admissionId) : new SqlParameter("@AdmissionID", DBNull.Value);
                var patidparam = patid.HasValue ? new SqlParameter("@PatientID", patid) : new SqlParameter("@PatientID", DBNull.Value);
                var docidparam = docid.HasValue ? new SqlParameter("@DoctorID", docid) : new SqlParameter("@DoctorID", DBNull.Value);

                var admissionDateParam = admissionDate.HasValue ? new SqlParameter("@AdmissionDate", admissionDate) : new SqlParameter("@AdmissionDate", DBNull.Value);
                var dischargeDateParam = dischargeDate.HasValue ? new SqlParameter("@DischargeDate", dischargeDate) : new SqlParameter("@DischargeDate", DBNull.Value);
                var wardTypeParam = string.IsNullOrEmpty(wardType) ? new SqlParameter("@WardType", DBNull.Value) : new SqlParameter("@WardType", wardType);
                var patientFullNameParam = string.IsNullOrEmpty(patientFullName) ? new SqlParameter("@PatientFullName", DBNull.Value) : new SqlParameter("@PatientFullName", patientFullName);
                var doctorFullNameParam = string.IsNullOrEmpty(doctorFullName) ? new SqlParameter("@DoctorFullName", DBNull.Value) : new SqlParameter("@DoctorFullName", doctorFullName);

                return await _context.Admissions.FromSqlRaw(sqlQuery, admissionIdParam,patidparam,docidparam, patientFullNameParam, doctorFullNameParam, admissionDateParam, dischargeDateParam, wardTypeParam).ToListAsync();
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                throw new Exception($"Error in GetAdmissionsAsync: {ex.Message}");
            }
        }

        public async Task<bool> InsertUpdateAdmission(Admission admission, string username)
        {
            try
            {
                if (admission != null)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Admissions_Insert_Update 
                        @AdmissionID={admission.Id},
                        @PatientID={admission.PatientId},
                        @DoctorID={admission.DoctorId},
                        @AdmissionDate={admission.AdmissionDate},
                        @DischargeDate={admission.DischargeDate},
                        @WardID={admission.WardId},
                        @WardNumber={admission.WardNumber},
                        @CreatedBy={username},
                        @UpdatedBy={username}");

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
                throw new Exception($"Error in InsertUpdateAdmission: {ex.Message}");
            }
        }

        public async Task<bool> DeleteAdmission(int? admissionId, string? patientFullName, string? doctorFullName, DateTime? admissionDate, DateTime? dischargeDate, string? wardType)
        {
            try
            {
                if (admissionId.HasValue || !string.IsNullOrEmpty(patientFullName) || !string.IsNullOrEmpty(doctorFullName) || admissionDate.HasValue || dischargeDate.HasValue || !string.IsNullOrEmpty(wardType))
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Admissions_DeleteAdmission 
                        @AdmissionID={admissionId},
                        @PatientFullName={patientFullName},
                        @DoctorFullName={doctorFullName},
                        @AdmissionDate={admissionDate},
                        @DischargeDate={dischargeDate},
                        @WardType={wardType}");

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
                throw new Exception($"Error in DeleteAdmission: {ex.Message}");
            }
        }
    }
}
