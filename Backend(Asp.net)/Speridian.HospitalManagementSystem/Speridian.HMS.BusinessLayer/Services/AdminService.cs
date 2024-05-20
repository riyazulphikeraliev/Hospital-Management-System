using AutoMapper;
using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using Speridian.HMS.DataAccessLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.BusinessLayer.Services
{
    public class AdminService
    {
        private readonly AdminRepo _repo;
        private readonly IMapper _mapper;

        public AdminService(AdminRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<List<AdminGetDto>> GetAdminsAsync(int? id, string? firstName, string? lastName, string? email, int?userId )
        {
            return _mapper.Map<List<AdminGetDto>>(await _repo.GetAdminsAsync(id, firstName, lastName, email, userId));
        }

        public async Task<bool> InsertUpdateAdmin(AdminInsertUpdateDto admin, string username)
        {
            return await _repo.InsertUpdateAdmin(_mapper.Map<Admin>(admin), username);
        }

        public async Task<bool> DeleteAdmin(int id)
        {
            return await _repo.DeleteAdmin(id);
        }
    }
}
    