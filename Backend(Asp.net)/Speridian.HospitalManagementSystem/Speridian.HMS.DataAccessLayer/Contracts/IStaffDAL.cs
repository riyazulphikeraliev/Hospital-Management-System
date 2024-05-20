using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Contracts
{
    public interface IStaffDAL
    {

        public Task<List<Staff>> GetStaffListAsync(int? id, string? fullName, string? position, string? contactNumber, string? email, string? address, string? roleName);
        public Task<bool> InsertUpdateStaffAsync(Staff staff, string username);
        public Task<bool> DeleteStaffAsync(int? id, string? fullName, string? position, int? roleId);
    }
}
