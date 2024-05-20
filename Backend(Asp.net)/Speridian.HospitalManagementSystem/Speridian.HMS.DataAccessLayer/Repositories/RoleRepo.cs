using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Contracts;
using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
  
    public class RoleRepo : IRoleDAL
    {
        private readonly HospitalManagementSystemWebapiContext _context;

        public RoleRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }

        public async Task<List<Role>> GetRolesAsync(int? id, string? roleName)
        {
            try
            {
                string sqlQuery = "USP_Roles_GetRoles @ID, @RoleName";

                var idParam = id.HasValue ? new SqlParameter("@ID", id) : new SqlParameter("@ID", DBNull.Value);
                var roleNameParam = string.IsNullOrEmpty(roleName) ? new SqlParameter("@RoleName", DBNull.Value) : new SqlParameter("@RoleName", roleName);

                return await _context.Roles.FromSqlRaw(sqlQuery, idParam, roleNameParam).ToListAsync();
            }
            catch (Exception ex)
            {
                // Handle exception (log, throw, etc.)
                throw new Exception($"Error in GetRolesAsync: {ex.Message}");
            }
        }

        public async Task<bool> InsertUpdateRoleAsync(Role role, string username)
        {
            try
            {
                if (role != null)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Roles_Insert_Update @ID={role.Id}, @RoleName={role.RoleName},@CreatedBy={username},@UpdatedBy={username}");
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
                throw new Exception($"Error in InsertUpdateRoleAsync: {ex.Message}");
            }
        }

        public async Task<bool> DeleteRoleAsync(int? id, string? roleName)
        {
            try
            {
                if (id != null || !string.IsNullOrEmpty(roleName))
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"EXEC USP_Roles_DeleteRole @ID={id}, @RoleName={roleName}");
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
                throw new Exception($"Error in DeleteRoleAsync: {ex.Message}");
            }
        }
    }
}
