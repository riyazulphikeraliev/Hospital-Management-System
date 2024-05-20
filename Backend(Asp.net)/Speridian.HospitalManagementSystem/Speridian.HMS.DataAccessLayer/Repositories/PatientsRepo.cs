using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Contracts;
using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class PatientsRepo : IPatientDAL
    {
        private readonly HospitalManagementSystemWebapiContext _context;

        public PatientsRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }

        public async Task<List<Patient>> GetPatients(int? id, string? firstname, string? lastname, DateTime dob, string? gender, string? number, string? address,int?userId)
        {
            try
            {
                string sqlQuery = "USP_Patients_GetPatients @ID, @FirstName, @LastName, @DateOfBirth, @Gender, @ContactNumber, @Address,@UserID";

                var idParam = id.HasValue ? new SqlParameter("@ID", id) : new SqlParameter("@ID", DBNull.Value);
                var firstNameParam = string.IsNullOrEmpty(firstname) ? new SqlParameter("@FirstName", DBNull.Value) : new SqlParameter("@FirstName", firstname);
                var lastNameParam = string.IsNullOrEmpty(lastname) ? new SqlParameter("@LastName", DBNull.Value) : new SqlParameter("@LastName", lastname);
                var dobParam = dob == default ? new SqlParameter("@DateOfBirth", DBNull.Value) : new SqlParameter("@DateOfBirth", dob);
                var genderParam = string.IsNullOrEmpty(gender) ? new SqlParameter("@Gender", DBNull.Value) : new SqlParameter("@Gender", gender);
                var numberParam = string.IsNullOrEmpty(number) ? new SqlParameter("@ContactNumber", DBNull.Value) : new SqlParameter("@ContactNumber", number);
                var addressParam = string.IsNullOrEmpty(address) ? new SqlParameter("@Address", DBNull.Value) : new SqlParameter("@Address", address);
                var useridParam = userId.HasValue ? new SqlParameter("@UserID", userId) : new SqlParameter("@UserID", DBNull.Value);


                return await _context.Patients.FromSqlRaw(sqlQuery, idParam, firstNameParam, lastNameParam, dobParam, genderParam, numberParam, addressParam,useridParam).ToListAsync();
            }
            catch (Exception ex)
            {
                // Handle exception (log, throw, etc.)
                throw new Exception($"Error in GetPatients: {ex.Message}");
            }
        }

        public async Task<bool> InsertUpdatePatient(Patient patient, string username)
        {
            try
            {
                if (patient != null)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Patients_Insert_Update @ID = {patient.Id},@FirstName={patient.FirstName},@LastName={patient.LastName}
                ,@DateOfBirth={patient.DateOfBirth},@Gender={patient.Gender},@ContactNumber={patient.ContactNumber},@Email={patient.Email},@Address={patient.Address}, @ImagePath={patient.ImagePath},
                @UserName={patient.UserName},
                @Password={patient.Password},@CreatedBy={username},@UpdatedBy={username}");
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
                throw new Exception($"Error in InsertUpdatePatient: {ex.Message}");
            }
        }

        public async Task<bool> DeletePatient(int? id, string fname, string lname)
        {
            try
            {
                if (id != null || !string.IsNullOrEmpty(fname) || !string.IsNullOrEmpty(lname))
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Patients_DeletePatient @ID = {id},@FirstName={fname},@LastName={lname}");
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
                throw new Exception($"Error in DeletePatient: {ex.Message}");
            }
        }
    }
}
