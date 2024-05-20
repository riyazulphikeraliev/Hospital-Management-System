using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class AdminRepo
    {
        private readonly HospitalManagementSystemWebapiContext _context;

        public AdminRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }

        public async Task<List<Admin>> GetAdminsAsync(int? id, string? firstName, string? lastName, string? email,int?userId)
        {
            try
            {
                string sqlQuery = "USP_Admins_GetAdmins @ID, @FirstName, @LastName, @Email,@UserID";

                var idParam = id.HasValue ? new SqlParameter("@ID", id) : new SqlParameter("@ID", DBNull.Value);
                var firstNameParam = string.IsNullOrEmpty(firstName) ? new SqlParameter("@FirstName", DBNull.Value) : new SqlParameter("@FirstName", firstName);
                var lastNameParam = string.IsNullOrEmpty(lastName) ? new SqlParameter("@LastName", DBNull.Value) : new SqlParameter("@LastName", lastName);
                var emailParam = string.IsNullOrEmpty(email) ? new SqlParameter("@Email", DBNull.Value) : new SqlParameter("@Email", email);
                var useridParam = userId.HasValue ? new SqlParameter("@UserID", userId) : new SqlParameter("@UserID", DBNull.Value);


                return await _context.Admins.FromSqlRaw(sqlQuery, idParam, firstNameParam, lastNameParam, emailParam,useridParam).ToListAsync();
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                throw new Exception($"Error in GetAdminsAsync: {ex.Message}");
            }
        }

        public async Task<bool> InsertUpdateAdmin(Admin admin, string username)
        {
            try
            {
                if (admin != null)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Admins_Insert_Update @ID={admin.Id},@FirstName={admin.FirstName},@LastName={admin.LastName},@Email={admin.Email},@ContactNumber={admin.ContactNumber},@ImagePath={admin.ImagePath},@Address={admin.Address},@DateOfBirth={admin.DateOfBirth},@CreatedBy={username},@UpdatedBy={username},@UserName={admin.UserName},@Password={admin.Password}");
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
                throw new Exception($"Error in InsertUpdateAdmin: {ex.Message}");
            }
        }

        public async Task<bool> DeleteAdmin(int id)
        {
            try
            {
                if (id > 0)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($"USP_Admins_DeleteAdmin @ID={id}");
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
                throw new Exception($"Error in DeleteAdmin: {ex.Message}");
            }
        }
    }
}
