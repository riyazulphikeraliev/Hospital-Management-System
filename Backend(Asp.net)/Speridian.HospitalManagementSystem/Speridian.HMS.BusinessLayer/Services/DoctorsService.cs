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
    public class DoctorsService 
    {
        private readonly DoctorsRepo _repo;
        private readonly IMapper _mapper;
        public DoctorsService(DoctorsRepo repo,IMapper mapper)
        {
            this._repo = repo;  
            this._mapper = mapper;
        }
        public  async Task<List<DoctorsGetDto>> GetDoctorsAsync(int? id, string FirstName, string LastName, string SpecializationName, int? SpecializationID, int? userId)
        {           
            return  _mapper.Map<List<DoctorsGetDto>>(await _repo.GetDoctorsAsync(id, FirstName, LastName, SpecializationName, SpecializationID,userId));
        }
        public async Task<bool> InsertUpdate(DoctorsInsertUpdateDto doc, string username)
        {                     
            return await _repo.InsertUpdate(_mapper.Map<Doctor>(doc), username);
        }
        public async Task<bool>DeleteDoctor(int id)
        {
            return await _repo.DeleteDoctor(id);
        }
    }
}
