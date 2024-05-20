using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Contracts
{
    public interface IAppointmentDAL
    {
        public Task<List<Appointment>> GetAvailableAppointmentSlots(Appointment appointment);

        public Task<List<Appointment>> GetAppointmentsAsync(int? id, string? doctorFullName, string? patientFullName, string? status,string? specName, int? patid, int? docid);
        public Task<bool> InsertUpdateAppointment(Appointment appointment,string username);

        public Task<bool> DeleteAppointment(int? id, string? doctorFullName, string? patientFullName, int? scheduleId);

    }
}
