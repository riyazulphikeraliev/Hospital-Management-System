using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Speridian.HMS.BusinessLayer.Services;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using Speridian.HMS.Helpers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DScheduleController : ControllerBase
    {
        private readonly DoctorScheduleService _service;
        Authorize _auth;

        public DScheduleController(DoctorScheduleService service, Authorize auth)
        {
            _service = service;
            _auth = auth;
        }

        [AllowAnonymous]
        [HttpGet("Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
      
        public async Task<IActionResult> GetDoctorSchedulesAsync(int? id, string? doctorFullName, int? docid, string? dayOfWeek, DateTime? appointmentDate, TimeSpan? appointmentTime)
        {
            try
            {
                // Validate input parameters if needed

                var doctorSchedules = await _service.GetDoctorSchedulesAsync(id, doctorFullName,docid, dayOfWeek, appointmentDate,appointmentTime);
                return Ok(doctorSchedules);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost("Post")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin,Doctor,Receptionist")]
        public async Task<IActionResult> InsertDoctorSchedule(DoctorScheduleInsertUpdateDto schedule)
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var userName = await _auth.GetUserNameFromToken(token);
                // Validate input model
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid Model State");
                }

                bool success = await _service.InsertUpdateDoctorSchedule(schedule, userName);
                if (success)
                {
                    return Ok(new { message = "Doctor schedule inserted successfully" });
                }
                else
                {
                    return BadRequest("Failed to insert doctor schedule");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPut("Put")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin,Doctor,Receptionist")]
        public async Task<IActionResult> UpdateDoctorSchedule(DoctorScheduleInsertUpdateDto schedule)
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var userName = await _auth.GetUserNameFromToken(token);
                // Validate input model
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid Model State");
                }

                bool success = await _service.InsertUpdateDoctorSchedule(schedule, userName);
                if (success)
                {
                    return Ok(new { message = "Doctor schedule updated successfully" });
                }
                else
                {
                    return BadRequest("Failed to update doctor schedule");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete("Delete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin,Doctor,Nurse,Receptionist")]
        public async Task<IActionResult> DeleteDoctorSchedule(int? id, string? doctorFullName, string? dayOfWeek)
        {
            try
            {
                // Validate input parameters if needed

                bool success = await _service.DeleteDoctorSchedule(id, doctorFullName, dayOfWeek);
                if (success)
                {
                    return Ok(new { message = "Doctor schedule deleted successfully" });
                }
                else
                {
                    return BadRequest("Failed to delete doctor schedule");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
