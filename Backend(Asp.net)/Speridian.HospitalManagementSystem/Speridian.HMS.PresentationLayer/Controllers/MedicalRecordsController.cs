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
    public class MedicalRecordsController : ControllerBase
    {
        private readonly MedicalRecordsService _service;
        Authorize _auth;

        public MedicalRecordsController(MedicalRecordsService service, Authorize auth)
        {
            _service = service;
            _auth = auth;
        }

        [HttpGet("Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin,Doctor,Patient,Nurse")]
        public async Task<IActionResult> GetMedicalRecordsAsync(int? id, int? pid, int? did, DateTime? date, string? diagnosis, string? prescription, string? testresult,int? specid, string? specname, string? docname, string? patname)
        {
            try
            {
                // Validate input parameters if needed

                var medicalRecords = await _service.GetMedicalRecordsAsync(id, pid, did, date, diagnosis, prescription, testresult, specid, specname, docname, patname);
                return Ok(medicalRecords);
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
        [Authorize(Roles = "Admin,Doctor,Nurse")]
        public async Task<IActionResult> InsertMR(MedicalRecordsInsertUpdateDto medireco)
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

                bool success = await _service.InsertUpdate(medireco, userName);
                if (success)
                {
                    return Ok(new { message = "Medical record inserted successfully" });
                }
                else
                {
                    return BadRequest("Failed to insert medical record");
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
        [Authorize(Roles = "Admin,Doctor,Nurse")]
        public async Task<IActionResult> UpdateMR(MedicalRecordsInsertUpdateDto medireco)
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

                bool success = await _service.InsertUpdate(medireco, userName);
                if (success)
                {
                    return Ok(new { message = "Medical record updated successfully" });
                }
                else
                {
                    return BadRequest("Failed to update medical record");
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
        public async Task<IActionResult> DeleteMR(int? id, string? patname, string? docname, string? diagnosis)
        {
            try
            {
                // Validate input parameters if needed

                bool success = await _service.DeleteRecord(id, patname, docname, diagnosis);
                if (success)
                {
                    return Ok(new { message = "Medical record deleted successfully" });
                }
                else
                {
                    return BadRequest("Failed to delete medical record");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
