using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class UsersRepo
    {
        private readonly HospitalManagementSystemWebapiContext _context;

        public UsersRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }

        public async Task<(string RoleName, int ID)> GetRoleAndIDByUserIDAsync(int userID)
        {
            try
            {
                var roleNameParam = new SqlParameter("@UserID", userID);
                var roleName = await _context.Roles
                    .FromSqlRaw("EXEC [dbo].[GetRoleAndIDByUserID] @UserID", roleNameParam)
                    .Select(r => r.RoleName)
                    .FirstOrDefaultAsync();

                if (string.IsNullOrEmpty(roleName))
                {
                    // Role name not found for the user
                    return (null, 0); // Return appropriate default values or handle the case
                }

                // Determine the master table and ID column based on the role name
                string masterTableName;
                string idColumnName;

                switch (roleName)
                {
                    case "Doctor":
                        masterTableName = "Doctors";
                        idColumnName = "ID";
                        break;
                    case "Patient":
                        masterTableName = "Patients";
                        idColumnName = "ID";
                        break;
                    case "Admin":
                        masterTableName = "Admins";
                        idColumnName = "ID";
                        break;
                    default:
                        // Handle unsupported role
                        return (null, 0); // Return appropriate default values or handle the case
                }

                // Query the corresponding master table to retrieve the ID
                var idParam = new SqlParameter("@UserID", userID);
                var id = await _context.Set<object>()
                    .FromSqlRaw($"EXEC [dbo].[GetRoleAndIDByUserID] @UserID", idParam)
                    .Select(r => EF.Property<int>(r, idColumnName))
                    .FirstOrDefaultAsync();

                return (roleName, id);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                throw new Exception($"Error in GetRoleAndIDByUserIDAsync: {ex.Message}");
            }
        }
    }
}
