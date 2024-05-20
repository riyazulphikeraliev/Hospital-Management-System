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
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentService _service;
        Authorize _auth;

        public AppointmentController(AppointmentService service, Authorize auth)
        {
            this._service = service;
            this._auth = auth;
        }

        [HttpGet("Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin,Doctor,Patient,Receptionist")]
        public async Task<IActionResult> GetAppointmentsAsync(int? id, string? doctorFullName, string? patientFullName, string? status,string?SpecName, int? patid, int? docid)
        {
            try
            {
                // Validate input parameters if needed

                var appointments = await _service.GetAppointmentsAsync(id, doctorFullName, patientFullName, status,SpecName,patid,docid);
                return Ok(appointments);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }
        [AllowAnonymous]
        [HttpPost("Post")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
       
        public async Task<IActionResult> InsertAppointment(AppointmentInsertUpdateDto appointment)
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                // var userName = await _auth.GetUserNameFromToken(token);
                var userName = "anguTrial";
                // Validate input model
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid Model State");
                }

                bool success = await _service.InsertUpdateAppointment(appointment, userName);
                if (success)
                {
                    return Ok(new { message = "Appointment inserted successfully" });
                }
                else
                {
                    return BadRequest("Failed to insert appointment");
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
        [Authorize(Roles = "Admin,Receptionist,Doctor")]
        public async Task<IActionResult> UpdateAppointment(AppointmentInsertUpdateDto appointment)
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

                bool success = await _service.InsertUpdateAppointment(appointment, userName);
                if (success)
                {
                    return Ok(new { message = "Appointment updated successfully" });
                }
                else
                {
                    return BadRequest("Failed to update appointment");
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
        [Authorize(Roles = "Admin,Receptionist,Patient")]
        public async Task<IActionResult> DeleteAppointment(int? id, string? doctorFullName, string? patientFullName, int? scheduleId)
        {
            try
            {
                // Validate input parameters if needed

                bool success = await _service.DeleteAppointment(id, doctorFullName, patientFullName, scheduleId);
                if (success)
                {
                    return Ok(new { message = "Appointment deleted successfully" });
                }
                else
                {
                    return BadRequest("Failed to delete appointment");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost("GetAvailableSlots")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAvailableSlots(AppointmentInsertUpdateDto appointment)
        {
            try
            {
                var slots = await _service.GetAvailableAppointmentSlots(appointment);
                return Ok(slots);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
