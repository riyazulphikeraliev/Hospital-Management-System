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
    public class DoctorController : ControllerBase
    {
        private readonly DoctorsService _Service;
        Authorize _auth;

        public DoctorController(DoctorsService Service, Authorize auth)
        {
            _Service = Service;
            _auth = auth;
        }
        [AllowAnonymous]
        [HttpGet("GetDoctors")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
      
        public async Task<IActionResult> GetDoctorAsync(int? id, string? FirstName, string? LastName, string? Specialization, int? SpecializationID, int? userId)
        {
            try
            {
                var doctors = await _Service.GetDoctorsAsync(id, FirstName, LastName, Specialization, SpecializationID, userId);
                return Ok(doctors);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost("PostDoctors")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Insert(DoctorsInsertUpdateDto doc)
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

                bool success = await _Service.InsertUpdate(doc, userName);
                if (success)
                {
                    return Ok(new { message = "Doctor inserted successfully" });
                }
                else
                {
                    return BadRequest( new { message = "Failed to insert doctor" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPut("PutDoctors")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin,Doctor")]
        public async Task<IActionResult> Update([FromBody]DoctorsInsertUpdateDto doc)
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

                bool success = await _Service.InsertUpdate(doc, userName);
                if (success)
                {
                    return Ok(new { message ="Doctor updated successfully" });
                }
                else
                {
                    return BadRequest("Failed to update doctor");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete("DeleteDoctors")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            try
            {
                // Validate input parameters if needed

                bool success = await _Service.DeleteDoctor(id);
                if (success)
                {
                    return Ok(new { message = "Doctor deleted successfully" });
                }
                else
                {
                    return BadRequest("Failed to delete doctor");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
