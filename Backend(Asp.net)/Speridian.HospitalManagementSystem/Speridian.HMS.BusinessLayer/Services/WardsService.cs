using AutoMapper;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.BusinessLayer.Services
{
    public class WardsService
    {
        private readonly WardsRepo _repo;
        private readonly IMapper _mapper;
        public WardsService(WardsRepo repo, IMapper mapper)
        {
            this._mapper = mapper;
            _repo = repo;
        }
        public async Task<List<WardDto>> GetWards(int? id, string? wardType, int? capacity, int? currentOccupancy)
        {
            return _mapper.Map<List<WardDto>>(await _repo.GetWards(id, wardType, capacity, currentOccupancy));
        }

        public async Task<bool> InsertUpdate(WardDto ward,string username)
        {
            return await _repo.InsertUpdate(_mapper.Map<Ward>(ward),username);
        }

        public async Task<bool> DeleteWard(int? id, string? wardType)
        {
            return await _repo.DeleteWard(id, wardType);
        }

    }
}
