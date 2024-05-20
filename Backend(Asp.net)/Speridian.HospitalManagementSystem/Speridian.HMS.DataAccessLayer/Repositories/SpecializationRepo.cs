using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Contracts;
using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class SpecializationRepo: ISpecializationDAL
    {
        private readonly HospitalManagementSystemWebapiContext _context;

        public SpecializationRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }

        public async Task<List<Specialization>> GetSpecialization(int? id, string? name)
        {
            try
            {
                string sqlQuery = "USP_Specializations_GetSpecializations @id, @name";

                var idParam = id.HasValue ? new SqlParameter("@id", id) : new SqlParameter("@id", DBNull.Value);
                var nameParam = string.IsNullOrEmpty(name) ? new SqlParameter("@name", DBNull.Value) : new SqlParameter("@name", name);

                return await _context.Specializations.FromSqlRaw(sqlQuery, idParam, nameParam).ToListAsync();
            }
            catch (Exception ex)
            {
                // Handle exception (log, throw, etc.)
                throw new Exception($"Error in GetSpecialization: {ex.Message}");
            }
        }

        public async Task<bool> InsertUpdate(Specialization spec, string username)
        {
            try
            {
                if (spec != null)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Specializations_Insert_Update @ID = {spec.Id},@Name={spec.SpecializationName},@ImagePath={spec.ImagePath},@CreatedBy={username},@UpdatedBy={username}");
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
                throw new Exception($"Error in InsertUpdate: {ex.Message}");
            }
        }

        public async Task<bool> DeleteSpecialization(int? id, string? name)
        {
            try
            {
                if (id != null || !string.IsNullOrEmpty(name))
                {
                    string sqlQuery = "EXEC USP_Specializations_DeleteSpecialization @id, @name";

                    var idParam = id.HasValue ? new SqlParameter("@id", id) : new SqlParameter("@id", DBNull.Value);
                    var nameParam = string.IsNullOrEmpty(name) ? new SqlParameter("@name", DBNull.Value) : new SqlParameter("@name", name);

                     await _context.Database.ExecuteSqlRawAsync(sqlQuery, idParam, nameParam);
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
                throw new Exception($"Error in DeleteSpecialization: {ex.Message}");
            }
        }
    }
}
