using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Contracts;
using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class StaffRepo:IStaffDAL
    {
        private readonly HospitalManagementSystemWebapiContext _context;

        public StaffRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }

        public async Task<List<Staff>> GetStaffListAsync(int? id, string? fullName, string? position, string? contactNumber, string? email, string? address, string? roleName)
        {
            try
            {
                string sqlQuery = "USP_Staff_GetStaffList @ID, @FullName, @Position, @ContactNumber, @Email, @Address, @RoleName";

                var idParam = id.HasValue ? new SqlParameter("@ID", id) : new SqlParameter("@ID", DBNull.Value);
                var fullNameParam = string.IsNullOrEmpty(fullName) ? new SqlParameter("@FullName", DBNull.Value) : new SqlParameter("@FullName", fullName);
                var positionParam = string.IsNullOrEmpty(position) ? new SqlParameter("@Position", DBNull.Value) : new SqlParameter("@Position", position);
                var contactNumberParam = string.IsNullOrEmpty(contactNumber) ? new SqlParameter("@ContactNumber", DBNull.Value) : new SqlParameter("@ContactNumber", contactNumber);
                var emailParam = string.IsNullOrEmpty(email) ? new SqlParameter("@Email", DBNull.Value) : new SqlParameter("@Email", email);
                var addressParam = string.IsNullOrEmpty(address) ? new SqlParameter("@Address", DBNull.Value) : new SqlParameter("@Address", address);
                var roleNameParam = string.IsNullOrEmpty(roleName) ? new SqlParameter("@RoleName", DBNull.Value) : new SqlParameter("@RoleName", roleName);

                return await _context.Staff.FromSqlRaw(sqlQuery, idParam, fullNameParam, positionParam, contactNumberParam, emailParam, addressParam, roleNameParam).ToListAsync();
            }
            catch (Exception ex)
            {
                // Handle exception (log, throw, etc.)
                throw new Exception($"Error in GetStaffListAsync: {ex.Message}");
            }
        }

        public async Task<bool> InsertUpdateStaffAsync(Staff staff, string username)
        {
            try
            {
                if (staff != null)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Staff_Insert_Update @StaffID={staff.Id}, @FirstName={staff.FirstName}, @LastName={staff.LastName}, @Position={staff.Position}, @ContactNumber={staff.ContactNumber}, @Email={staff.Email}, @Address={staff.Address}, @RoleID={staff.RoleId},@CreatedBy={username},@UpdatedBy={username}");

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
                throw new Exception($"Error in InsertUpdateStaffAsync: {ex.Message}");
            }
        }

        public async Task<bool> DeleteStaffAsync(int? id, string? fullName, string? position, int? roleId)
        {
            try
            {
                if (id != null || !string.IsNullOrEmpty(fullName) || !string.IsNullOrEmpty(position) || roleId != null)
                {
                    string sqlQuery = "EXEC USP_Staff_DeleteStaff @StaffID, @FullName, @Position, @RoleID";

                    var idParam = id.HasValue ? new SqlParameter("@StaffID", id) : new SqlParameter("@StaffID", DBNull.Value);
                    var fullNameParam = string.IsNullOrEmpty(fullName) ? new SqlParameter("@FullName", DBNull.Value) : new SqlParameter("@FullName", fullName);
                    var positionParam = string.IsNullOrEmpty(position) ? new SqlParameter("@Position", DBNull.Value) : new SqlParameter("@Position", position);
                    var roleIdParam = roleId.HasValue ? new SqlParameter("@RoleID", roleId) : new SqlParameter("@RoleID", DBNull.Value);

                     await _context.Database.ExecuteSqlRawAsync(sqlQuery, idParam, fullNameParam, positionParam, roleIdParam);

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
                throw new Exception($"Error in DeleteStaffAsync: {ex.Message}");
            }
        }
    }
}
