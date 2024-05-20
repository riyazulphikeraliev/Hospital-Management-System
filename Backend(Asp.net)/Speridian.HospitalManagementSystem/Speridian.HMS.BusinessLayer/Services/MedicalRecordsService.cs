using AutoMapper;
using AutoMapper.Configuration.Conventions;
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
    public class MedicalRecordsService
    {
        private readonly MedicalRecordsRepo _repo;
        private readonly IMapper _mapper;
        public MedicalRecordsService(MedicalRecordsRepo repo, IMapper _mapper)
        {
            this._repo = repo;
            this._mapper = _mapper;
        }

        public async Task<List<MedicalRecordsGetDto>>GetMedicalRecordsAsync(int? id, int? pid, int? did, DateTime? date, string? diagnosis, string? prescription, string? testresult,int?specid, string? specname, string? docname, string? patname)
        {
            return _mapper.Map<List<MedicalRecordsGetDto>>(await _repo.GetMedicalRecordsAsync(id, pid, did, date, diagnosis, prescription, testresult,specid, specname, docname, patname));
        }
        public async Task<bool>InsertUpdate(MedicalRecordsInsertUpdateDto record, string username)
        {
            return await _repo.InsertUpdateMR(_mapper.Map<MedicalRecord>(record), username);
        }
        public async Task<bool> DeleteRecord(int? id, string? patname, string? docname, string? diagnosis)
        {
            return await _repo.DeleteMR(id, patname, docname, diagnosis);
        }
    }
}
