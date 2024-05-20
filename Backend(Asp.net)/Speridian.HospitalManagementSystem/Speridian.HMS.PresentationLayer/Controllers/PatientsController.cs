using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Speridian.HMS.BusinessLayer.Services;
using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using Speridian.HMS.Helpers;
using System;
using System.Threading.Tasks;

namespace Speridian.HMS.PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly PatientsService _service;
        Authorize _auth;

        public PatientsController(PatientsService service, Authorize auth)
        {
            _service = service;
            _auth = auth;
        }

        [HttpGet("Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin,Doctor,Patient,Nurse,Receptionist")]
        public async Task<IActionResult> GetPatients(int? id, string? firstname, string? lastname, DateTime dob, string? gender, string? number, string? address, int? userId)
        {
            try
            {
                // Validate input parameters if needed

                var patients = await _service.GetPatients(id, firstname, lastname, dob, gender, number, address,userId);
                return Ok(patients);
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
      
        public async Task<IActionResult> InsertPatient([FromBody]PatientInsertUpdateDto patient)
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var userName = patient.UserName;
                // Validate input model
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid Model State");
                }

                bool success = await _service.InsertUpdatePatient(patient, userName);
                if (success)
                {
                    return Ok(new { message = "Patient inserted successfully" });
                }
                else
                {
                    return BadRequest("Failed to insert patient");
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
       [Authorize(Roles = "Admin,Patient,Doctor")]
        public async Task<IActionResult> UpdatePatient([FromBody]PatientInsertUpdateDto patient)
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

                bool success = await _service.InsertUpdatePatient(patient, userName);
                if (success)
                {
                    return Ok(new { message = "Patient updated successfully" });
                }
                else
                {
                    return BadRequest("Failed to update patient");
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
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePatient(int? id, string? fname, string? lname)
        {
            try
            {

                bool success = await _service.DeletedPatient(id, fname, lname);
                if (success)
                {
                    return Ok(new { message = "Patient deleted successfully" });
                }
                else
                {
                    return BadRequest("Failed to delete patient");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
