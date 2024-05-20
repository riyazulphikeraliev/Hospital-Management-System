using AutoMapper;
using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using Speridian.HMS.DataAccessLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.BusinessLayer.Services
{
    public class RoleService
    {
        private readonly RoleRepo _repo;
        private readonly IMapper _mapper;
        public RoleService(RoleRepo repo, IMapper mapper)
        {
            this._mapper = mapper;
            _repo = repo;
        }
        public async Task<List<RoleDto>> GetRoles(int? id, string? roleName)
        {
            return _mapper.Map<List<RoleDto>>(await _repo.GetRolesAsync(id, roleName));
        }

        public async Task<bool> InsertUpdateRole(RoleDto role, string username)
        {
           return await _repo.InsertUpdateRoleAsync(_mapper.Map<Role>(role), username);
        }

        public async Task<bool> DeleteRole(int? id, string? roleName)
        {
            return await _repo.DeleteRoleAsync(id, roleName);
        }
    }
}
