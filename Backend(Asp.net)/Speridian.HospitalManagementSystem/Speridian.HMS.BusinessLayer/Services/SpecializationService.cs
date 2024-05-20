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
    public class SpecializationService
    {
        private SpecializationRepo _repo;
        private IMapper _mapper;
        public SpecializationService(SpecializationRepo repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }
        public async Task<List<SpecializationDto>> GetSpecialization(int? id, string? Name)
        {
            return _mapper.Map<List<SpecializationDto>>(await _repo.GetSpecialization(id, Name));
        }
        public async Task<bool> InsertUpdate(SpecializationDto spec, string username)
        {
            return await _repo.InsertUpdate(_mapper.Map<Specialization>(spec), username);
        }
        public async Task<bool> DeleteSpecialization(int? id, string? name)
        {           
            return await _repo.DeleteSpecialization(id, name);
        }
    }
}
