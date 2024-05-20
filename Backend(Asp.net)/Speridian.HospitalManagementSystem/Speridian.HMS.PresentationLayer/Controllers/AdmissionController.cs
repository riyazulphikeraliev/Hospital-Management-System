using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Speridian.HMS.BusinessLayer.Services;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using Speridian.HMS.Exceptions;
using Speridian.HMS.Helpers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.PresentationLayer.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    
    public class AdmissionController : ControllerBase
    {
        private readonly AdmissionsService _service;
        Authorize _auth;

        public AdmissionController(AdmissionsService service, Authorize auth)
        {
            _service = service;
            _auth = auth;
        }

        [HttpGet("Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin,Patient")]
        public async Task<IActionResult> GetAdmissionsAsync(int? admissionId, DateTime? admissionDate, DateTime? dischargeDate, string? wardType, string? patientFullName, string? doctorFullName,int? patid, int?docid)
        {
            try
            {
                // Validate input parameters if needed

                List<AdmissionGetDto> admissions = await _service.GetAdmissionsAsync(admissionId, admissionDate, dischargeDate, wardType, patientFullName, doctorFullName,patid,docid);
                return Ok(admissions);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost("Post")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> InsertAdmission([FromBody] AdmissionInsertUpdateDto admission)
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

                bool success = await _service.InsertUpdate(admission,userName);
                if (success)
                {
                    return Ok(new { message = "Admission inserted successfully" });
                }
                else
                {
                    return BadRequest("Failed to insert admission");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPut("Put")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateAdmission(AdmissionInsertUpdateDto admission)
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

                bool success = await _service.InsertUpdate(admission, userName);
                if (success)
                {
                    return Ok(new { message = "Admission updated successfully" });
                }
                else
                {
                    //return BadRequest("Failed to update admission");
                    throw new HMSExceptions("Failed to update admission");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete("Delete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteAdmission(int? admissionId, string? patientFullName, string? doctorFullName, DateTime? admissionDate, DateTime? dischargeDate, string? wardType)
        {
            try
            {
                // Validate input parameters if needed

                bool success = await _service.DeleteAdmission(admissionId, patientFullName, doctorFullName, admissionDate, dischargeDate, wardType);
                if (success)
                {
                    return Ok(new { message = "Admission deleted successfully" });
                }
                else
                {
                    return BadRequest("Failed to delete admission");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
