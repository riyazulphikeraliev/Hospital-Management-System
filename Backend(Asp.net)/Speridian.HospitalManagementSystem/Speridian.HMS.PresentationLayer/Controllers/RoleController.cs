using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Speridian.HMS.BusinessLayer.Services;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using Speridian.HMS.Helpers;
using System;
using System.Threading.Tasks;

namespace Speridian.HMS.PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleService _service;
        Authorize _auth;

        public RoleController(RoleService service, Authorize auth)
        {
            _service = service;
            _auth = auth;
        }

        [HttpGet("GetRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRoles(int? id, string? roleName)
        {
            try
            {
                // Validate input parameters if needed

                var roles = await _service.GetRoles(id, roleName);
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost("AddRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> InsertRole([FromBody] RoleDto roleDto)
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

                bool success = await _service.InsertUpdateRole(roleDto, userName);
                if (success)
                {
                    return Ok(new {message= "Role inserted successfully" });
                    //return Ok("Role inserted successfully");
                }
                else
                {
                    return BadRequest("Failed to insert role");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPut("PutRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateRole(RoleDto roleDto)
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

                bool success = await _service.InsertUpdateRole(roleDto, userName);
                if (success)
                {
                    return Ok("Role updated successfully");
                }
                else
                {
                    return BadRequest("Failed to update role");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete("DeleteRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRole(int? id, string? roleName)
        {
            try
            {
                // Validate input parameters if needed

                bool success = await _service.DeleteRole(id, roleName);
                if (success)
                {
                    return Ok("Role deleted successfully");
                }
                else
                {
                    return BadRequest("Failed to delete role");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
