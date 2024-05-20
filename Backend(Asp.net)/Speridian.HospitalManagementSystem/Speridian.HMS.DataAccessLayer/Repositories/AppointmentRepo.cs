using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Contracts;
using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class AppointmentRepo: IAppointmentDAL
    {
        private readonly HospitalManagementSystemWebapiContext _context;

        public AppointmentRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }


        public async Task<List<Appointment>> GetAvailableAppointmentSlots(Appointment appointment)
        {
            try
            {
                var doctorIdParam = new SqlParameter("@DoctorID", appointment.DoctorId);
                var appointmentDateParam = new SqlParameter("@AppointmentDate", appointment.AppointmentDate);

                var availableSlots = await _context.Appointments
                    .FromSqlRaw("[USP_Appointments_GetAvailableAppointmentSlots] @DoctorID, @AppointmentDate",
                        doctorIdParam, appointmentDateParam)
                    .ToListAsync();

                return availableSlots;
            }
            catch (Exception ex)
            {
               
                throw new Exception($"Error in GetAvailableAppointmentSlots: {ex.Message}");
            }
        }

        public async Task<List<Appointment>> GetAppointmentsAsync(int? id, string? doctorFullName, string? patientFullName, string? status,string?SpecName, int? patid, int? docid)
        {
            try
            {
                string sqlQuery = "USP_Appointments_GetList @ID,@PatientID,@DoctorID,@PatientFullName, @DoctorFullName,  @Status, @SpecializationName";

                var idParam = id.HasValue ? new SqlParameter("@ID", id) : new SqlParameter("@ID", DBNull.Value);
                var patidparam = patid.HasValue ? new SqlParameter("@PatientID", patid) : new SqlParameter("@PatientID", DBNull.Value);
                var docidparam = docid.HasValue ? new SqlParameter("@DoctorID", docid) : new SqlParameter("@DoctorID", DBNull.Value);
                var doctorFullNameParam = string.IsNullOrEmpty(doctorFullName) ? new SqlParameter("@DoctorFullName", DBNull.Value) : new SqlParameter("@DoctorFullName", doctorFullName);
                var patientFullNameParam = string.IsNullOrEmpty(patientFullName) ? new SqlParameter("@PatientFullName", DBNull.Value) : new SqlParameter("@PatientFullName", patientFullName);
                var statusParam = string.IsNullOrEmpty(status) ? new SqlParameter("@Status", DBNull.Value) : new SqlParameter("@Status", status);
                var specnameparam = string.IsNullOrEmpty(SpecName) ? new SqlParameter("@SpecializationName", DBNull.Value) : new SqlParameter("@SpecializationName", SpecName);


                return await _context.Appointments.FromSqlRaw(sqlQuery, idParam,patidparam,docidparam, doctorFullNameParam, patientFullNameParam, statusParam,specnameparam).ToListAsync();
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                throw new Exception($"Error in GetAppointmentsAsync: {ex.Message}");
            }
        }

        public async Task<bool> InsertUpdateAppointment(Appointment appointment, string username)
        {
            try
            {
                if (appointment != null)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Appointments_Insert_Update 
                        @ID={appointment.Id},
                        @PatientID={appointment.PatientId},
                        @DoctorID={appointment.DoctorId},
                        @ScheduleID={appointment.ScheduleId},
                        @AppointmentDate={appointment.AppointmentDate},
                        @AppointmentTime={appointment.AppointmentTime},
                        @Status={appointment.Status},
                        @CreatedBy={username},
                        @UpdatedBy={username}");

                    return true;
                }
                else
                {
                    // Handle invalid input
                    return false;
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                throw new Exception($"Error in InsertUpdateAppointment: {ex.Message}");
            }
        }

        public async Task<bool> DeleteAppointment(int? id, string? doctorFullName, string? patientFullName, int? scheduleId)
        {
            try
            {
                if (id.HasValue || !string.IsNullOrEmpty(doctorFullName) || !string.IsNullOrEmpty(patientFullName) || scheduleId.HasValue)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_Appointments_Delete 
                        @ID={id}, 
                        @DoctorFullName={doctorFullName}, 
                        @PatientFullName={patientFullName}, 
                        @ScheduleID={scheduleId}");

                    return true;
                }
                else
                {
                    // Handle invalid input
                    return false;
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                throw new Exception($"Error in DeleteAppointment: {ex.Message}");
            }
        }
    }
}
