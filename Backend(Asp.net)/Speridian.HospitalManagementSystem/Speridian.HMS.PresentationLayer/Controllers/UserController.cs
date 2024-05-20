using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Speridian.HMS.BusinessLayer.Services;
using Speridian.HMS.DataAccessLayer.Models;

namespace Speridian.HMS.PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserService _Service;
        public UserController(UserService userService)
        {
            _Service = userService;
        }

        [HttpGet("Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        

        public async Task<IActionResult> GetUsersAsync(int UserId)
        {
            try
            {
                var (roleName, id) = await _Service.GetUsersAsync(UserId);

                if (string.IsNullOrEmpty(roleName) || id == 0)
                {
                    return NotFound(); // User not found or invalid data
                }

                var result = new { RoleName = roleName, ID = id };
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
