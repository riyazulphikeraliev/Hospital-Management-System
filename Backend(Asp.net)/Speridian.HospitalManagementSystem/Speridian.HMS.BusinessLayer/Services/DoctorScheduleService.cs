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
    public class DoctorScheduleService
    {
        private readonly DoctorScheduleRepo _repo;
        private readonly IMapper _mapper;

        public DoctorScheduleService(DoctorScheduleRepo repo, IMapper mapper)
        {
            this._mapper = mapper;
            _repo = repo;
        }

        public async Task<List<DoctorScheduleGetDto>> GetDoctorSchedulesAsync(int? id, string? doctorFullName, int? docid, string? dayOfWeek, DateTime? appointmentDate, TimeSpan? appointmentTime)
        {
            return _mapper.Map<List<DoctorScheduleGetDto>>(await _repo.GetDoctorSchedulesAsync(id, doctorFullName,docid, dayOfWeek,appointmentDate,appointmentTime));
        }

        public async Task<bool> InsertUpdateDoctorSchedule(DoctorScheduleInsertUpdateDto schedule, string username)
        {
            return await _repo.InsertUpdateDoctorSchedule(_mapper.Map<DoctorSchedule>(schedule), username);
        }


        public async Task<bool> DeleteDoctorSchedule(int? id, string? doctorFullName, string? dayOfWeek)
        {
            return await _repo.DeleteDoctorSchedule(id, doctorFullName, dayOfWeek);
        }

    }
}
