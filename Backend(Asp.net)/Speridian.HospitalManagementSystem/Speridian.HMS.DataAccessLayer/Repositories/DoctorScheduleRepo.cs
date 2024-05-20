using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Contracts;
using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class DoctorScheduleRepo : IDoctorScheduleDAL
    {
        private readonly HospitalManagementSystemWebapiContext _context;

        public DoctorScheduleRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }

        public async Task<List<DoctorSchedule>> GetDoctorSchedulesAsync(int? id, string? doctorFullName, int? doctorId, string? dayOfWeek, DateTime? appointmentDate, TimeSpan? appointmentTime)
        {
            try
            {
                string sqlQuery = "USP_DoctorSchedules_GetList @ID, @DoctorFullName, @DoctorID, @DayOfWeek, @AppointmentDate, @AppointmentTime";

                var idParam = id.HasValue ? new SqlParameter("@ID", id) : new SqlParameter("@ID", DBNull.Value);
                var doctorFullNameParam = string.IsNullOrEmpty(doctorFullName) ? new SqlParameter("@DoctorFullName", DBNull.Value) : new SqlParameter("@DoctorFullName", doctorFullName);
                var doctorIdParam = doctorId.HasValue ? new SqlParameter("@DoctorID", doctorId) : new SqlParameter("@DoctorID", DBNull.Value);
                var dayOfWeekParam = string.IsNullOrEmpty(dayOfWeek) ? new SqlParameter("@DayOfWeek", DBNull.Value) : new SqlParameter("@DayOfWeek", dayOfWeek);
                var appointmentDateParam = appointmentDate.HasValue ? new SqlParameter("@AppointmentDate", appointmentDate) : new SqlParameter("@AppointmentDate", DBNull.Value);
                var appointmentTimeParam = appointmentTime.HasValue ? new SqlParameter("@AppointmentTime", appointmentTime) : new SqlParameter("@AppointmentTime", DBNull.Value);

                return await _context.DoctorSchedules.FromSqlRaw(sqlQuery, idParam, doctorFullNameParam, doctorIdParam, dayOfWeekParam, appointmentDateParam, appointmentTimeParam).ToListAsync();
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                throw new Exception($"Error in GetDoctorSchedulesAsync: {ex.Message}");
            }
        }


        public async Task<bool> InsertUpdateDoctorSchedule(DoctorSchedule schedule, string username)
        {
            try
            {
                if (schedule != null)
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_DoctorSchedules_Insert_Update @ID={schedule.Id}, @DoctorID={schedule.DoctorID}, @DayOfWeek={schedule.DayOfWeek}, @StartTime={schedule.StartTime}, @EndTime={schedule.EndTime},@AppointmentSlots={schedule.AppointmentSlots},@CreatedBy={username},@UpdatedBy={username}");
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
                throw new Exception($"Error in InsertUpdateDoctorSchedule: {ex.Message}");
            }
        }

        public async Task<bool> DeleteDoctorSchedule(int? id, string? doctorFullName, string? dayOfWeek)
        {
            try
            {
                if (id.HasValue || !string.IsNullOrEmpty(doctorFullName) || !string.IsNullOrEmpty(dayOfWeek))
                {
                    await _context.Database.ExecuteSqlInterpolatedAsync($@"USP_DoctorSchedules_Delete @ID={id}, @DoctorFullName={doctorFullName}, @DayOfWeek={dayOfWeek}");
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
                throw new Exception($"Error in DeleteDoctorSchedule: {ex.Message}");
            }
        }
    }
}
