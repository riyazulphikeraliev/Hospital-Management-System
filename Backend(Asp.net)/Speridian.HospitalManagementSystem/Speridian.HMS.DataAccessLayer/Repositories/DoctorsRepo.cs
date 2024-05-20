using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Contracts;
using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class DoctorsRepo : IDoctorsDAL
    {
        private readonly HospitalManagementSystemWebapiContext _context;

        public DoctorsRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }

        public async Task<List<Doctor>> GetDoctorsAsync(int? id, string? FirstName, string? LastName, string? SpecializationName, int? SpecializationID,int?userId)
        {
            try
            {
                string sqlQuery = "USP_Doctors_GetDoctors @id, @FirstName, @LastName, @SpecializationName,@SpecializationID,@UserID";

                var idParam = id.HasValue ? new SqlParameter("@id", id) : new SqlParameter("@id", DBNull.Value);
                var firstNameParam = string.IsNullOrEmpty(FirstName) ? new SqlParameter("@FirstName", DBNull.Value) : new SqlParameter("@FirstName", FirstName);
                var lastNameParam = string.IsNullOrEmpty(LastName) ? new SqlParameter("@LastName", DBNull.Value) : new SqlParameter("@LastName", LastName);
                var specializationParam = string.IsNullOrEmpty(SpecializationName) ? new SqlParameter("@SpecializationName", DBNull.Value) : new SqlParameter("@SpecializationName", SpecializationName);
                var specidParam = SpecializationID.HasValue ? new SqlParameter("@SpecializationID", SpecializationID) : new SqlParameter("@SpecializationID", DBNull.Value);
                var useridParam = userId.HasValue ? new SqlParameter("@UserID", userId) : new SqlParameter("@UserID", DBNull.Value);



                return await _context.Doctors.FromSqlRaw(sqlQuery, idParam, firstNameParam, lastNameParam, specializationParam,specidParam,useridParam).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetDoctorsAsync: {ex.Message}");
            }
        }

        public async Task<bool> InsertUpdate(Doctor doc, string username)
        {
            try
            {
                if (doc != null)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Doctors_Insert_Update @id = {doc.Id},@FirstName={doc.FirstName},@LastName={doc.LastName},
                        @SpecializationId={doc.SpecializationId},@ContactNumber={doc.ContactNumber},@Email={doc.Email},@Address={doc.Address},@ImagePath={doc.ImagePath},@DateOfBirth={doc.DateOfBirth},@UserName={doc.UserName},@Password={doc.Password},@CreatedBy={username},@UpdatedBy={username}");
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in InsertUpdate: {ex.Message}");
            }
        }

        public async Task<bool> DeleteDoctor(int id)
        {
            try
            {
                if (id > 0)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($"USP_Doctors_DeleteDoctor @id = {id}");
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in DeleteDoctor: {ex.Message}");
            }
        }
    }
}
