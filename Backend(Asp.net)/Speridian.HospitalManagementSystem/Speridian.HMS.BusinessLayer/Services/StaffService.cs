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
    public class StaffService
    {
        private readonly StaffRepo _repo;
        private readonly IMapper _mapper;
        public StaffService(StaffRepo repo,IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }
        public async Task<List<StaffGetDto>> GetStaffList(int? id, string? fullName, string? position, string? contactNumber, string? email, string? address, string? roleName)
        {
            return _mapper.Map<List<StaffGetDto>>(await _repo.GetStaffListAsync(id, fullName, position, contactNumber, email, address, roleName));
        }

        public async Task<bool> InsertUpdateStaff(StaffInsertUpdateDto staffDto, string username)
        {
            var staff = _mapper.Map<Staff>(staffDto);
            return await _repo.InsertUpdateStaffAsync(staff, username);
        }

        public async Task<bool> DeleteStaff(int? id, string? fullName, string? position, int? roleId)
        {
            return await _repo.DeleteStaffAsync(id, fullName, position, roleId);
        }
    }
}
