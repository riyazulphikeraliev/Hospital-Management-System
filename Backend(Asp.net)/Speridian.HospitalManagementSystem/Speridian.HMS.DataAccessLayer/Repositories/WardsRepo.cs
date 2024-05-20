using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Contracts;
using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class WardsRepo: IWardsDAL
    {
        private readonly HospitalManagementSystemWebapiContext _context;

        public WardsRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }

        public async Task<List<Ward>> GetWards(int? id, string? wardType, int? capacity, int? currentOccupancy)
        {
            try
            {
                string sqlQuery = "USP_Wards_GetWards @ID, @WardType, @Capacity, @CurrentOccupancy";

                var idParam = id.HasValue ? new SqlParameter("@ID", id) : new SqlParameter("@ID", DBNull.Value);
                var wardTypeParam = string.IsNullOrEmpty(wardType) ? new SqlParameter("@WardType", DBNull.Value) : new SqlParameter("@WardType", wardType);
                var capacityParam = capacity.HasValue ? new SqlParameter("@Capacity", capacity) : new SqlParameter("@Capacity", DBNull.Value);
                var currentOccupancyParam = currentOccupancy.HasValue ? new SqlParameter("@CurrentOccupancy", currentOccupancy) : new SqlParameter("@CurrentOccupancy", DBNull.Value);

                return await _context.Wards.FromSqlRaw(sqlQuery, idParam, wardTypeParam, capacityParam, currentOccupancyParam).ToListAsync();
            }
            catch (Exception ex)
            {
                // Handle exception (log, throw, etc.)
                throw new Exception($"Error in GetWards: {ex.Message}");
            }
        }

        public async Task<bool> InsertUpdate(Ward ward,string username)
        {
            try
            {
                if (ward != null)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Wards_Insert_Update @ID={ward.Id},@WardType={ward.WardType},@Capacity={ward.Capacity},@CurrentOccupancy={ward.CurrentOccupancy},@CreatedBy={username},@UpdatedBy={username}");
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

        public async Task<bool> DeleteWard(int? id, string? wardType)
        {
            try
            {
                if (id != null || !string.IsNullOrEmpty(wardType))
                {
                    string sqlQuery = "EXEC USP_Wards_DeleteWard @ID, @WardType";
                    var idParam = id.HasValue ? new SqlParameter("@ID", id) : new SqlParameter("@ID", DBNull.Value);
                    var wardTypeParam = string.IsNullOrEmpty(wardType) ? new SqlParameter("@WardType", DBNull.Value) : new SqlParameter("@WardType", wardType);
                    await _context.Database.ExecuteSqlRawAsync(sqlQuery, idParam, wardTypeParam);
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
                throw new Exception($"Error in DeleteWard: {ex.Message}");
            }
        }
    }
}
