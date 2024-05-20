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
    public class AdmissionsService
    {
        private readonly AdmissionsRepo _repo;
        private readonly IMapper _mapper;
        public AdmissionsService(AdmissionsRepo repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }
        public async Task<List<AdmissionGetDto>> GetAdmissionsAsync(int? admissionId, DateTime? admissionDate, DateTime? dischargeDate,string? wardType, string? patientFullName, string? doctorFullName, int? patid, int? docid)
        {
            return _mapper.Map<List<AdmissionGetDto>>(await _repo.GetAdmissionsAsync(admissionId,  admissionDate, dischargeDate, wardType, patientFullName, doctorFullName,patid,docid));
        }

        public async Task<bool> InsertUpdate(AdmissionInsertUpdateDto admission,string username)
        {
            return await _repo.InsertUpdateAdmission(_mapper.Map<Admission>(admission), username);
        }

        public async Task<bool> DeleteAdmission(int? admissionId, string? patientFullName, string? doctorFullName, DateTime? admissionDate, DateTime? dischargeDate, string? wardType)
        {
            return await _repo.DeleteAdmission(admissionId, patientFullName, doctorFullName, admissionDate, dischargeDate, wardType);
        }

    }
}
