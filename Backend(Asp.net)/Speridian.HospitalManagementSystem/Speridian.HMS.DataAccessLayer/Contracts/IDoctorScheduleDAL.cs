using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Contracts
{
    public interface IDoctorScheduleDAL
    {


        public Task<List<DoctorSchedule>> GetDoctorSchedulesAsync(int? id, string? doctorFullName,int? docid, string? dayOfWeek , DateTime? appointmentDate, TimeSpan? appointmentTime);
        public Task<bool> InsertUpdateDoctorSchedule(DoctorSchedule schedule, string username);
        public Task<bool> DeleteDoctorSchedule(int? id, string? doctorFullName, string? dayOfWeek);
    }
}
