using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Contracts
{
    public interface IRoleDAL
    {
        public Task<List<Role>> GetRolesAsync(int? id, string? roleName);
        public Task<bool> InsertUpdateRoleAsync(Role role, string username);

        public Task<bool> DeleteRoleAsync(int? id, string? roleName);

    }
}
