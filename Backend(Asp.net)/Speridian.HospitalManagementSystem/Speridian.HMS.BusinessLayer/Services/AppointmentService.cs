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
    public class AppointmentService
    {
        private readonly AppointmentRepo _repo;
        private readonly IMapper _mapper;

        public AppointmentService(AppointmentRepo repo,IMapper mapper )
        {
            this._mapper = mapper;
            _repo=repo;
        }
        public async Task<List<AppointmentGetDto>> GetAppointmentsAsync(int? id, string? doctorFullName, string? patientFullName, string? status,string? SpecName, int? patid, int? docid)
        {
            return _mapper.Map<List<AppointmentGetDto>>(await _repo.GetAppointmentsAsync(id, doctorFullName, patientFullName, status,SpecName,patid,docid));
        }

        public async Task<bool> InsertUpdateAppointment(AppointmentInsertUpdateDto appointment, string username)
        {
            return await _repo.InsertUpdateAppointment(_mapper.Map<Appointment>(appointment), username);
        }

        public async Task<bool> DeleteAppointment(int? id, string? doctorFullName, string? patientFullName, int? scheduleId)
        {
            return await _repo.DeleteAppointment(id, doctorFullName, patientFullName, scheduleId);
        }

        public async Task<List<Appointment>> GetAvailableAppointmentSlots(AppointmentInsertUpdateDto appointment)
        {

            return await _repo.GetAvailableAppointmentSlots(_mapper.Map<Appointment>(appointment));
            
        }
    }
}
