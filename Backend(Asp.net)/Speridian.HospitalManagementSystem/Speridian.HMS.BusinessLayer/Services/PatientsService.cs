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
    public class PatientsService
    {
        private readonly PatientsRepo _repo;
        private readonly IMapper _mapper;
        public PatientsService(PatientsRepo repo, IMapper mapper)
        {
            this._repo = repo;   
            this._mapper = mapper;
        }

        public async Task<List<PatientsDto>>GetPatients(int? id, string? firstname, string? lastname, DateTime dob, string? gender, string? number, string? address, int? userId)
        {
            return  _mapper.Map<List<PatientsDto>>(await _repo.GetPatients(id, firstname, lastname, dob, gender, number, address, userId));
        }
        public async Task<bool>InsertUpdatePatient(PatientInsertUpdateDto patient, string username)
        {
            return await _repo.InsertUpdatePatient(_mapper.Map<Patient>(patient), username);
        }
        public async Task<bool> DeletedPatient(int? id, string? fname, string? lname)
        {
            return await _repo.DeletePatient(id, fname, lname);
        }
    }
}
