using Microsoft.AspNetCore.Mvc;
using Speridian.HMS.BusinessLayer.Services;
using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using Speridian.HMS.Exceptions;
using Speridian.HMS.Helpers;
using System.Security.Claims;

namespace Speridian.HMS.PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        LoginUserService _service;
        Authorize _auth;
        public LoginController(LoginUserService service, Authorize auth)
        {
            this._service = service;
            this._auth = auth;
        }
        

        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddUsersAsync([FromBody] UserDto userDTO)
        {
            if (!ModelState.IsValid)
            {
                throw new BadHttpRequestException("ModelState invalid");
            }
            else
            {

                bool status = await _service.AddUsersAsync(userDTO);
                if (status)
                {
                    return Ok("Created");
                }
                else
                {
                    throw new HMSExceptions("Unable to Add");
                }
            }
        }

        [HttpPost("ChangePassword")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ChangeUserPassword([FromBody] ChangePasswordDto changePassword)
        {
            if (!ModelState.IsValid)
            {
                throw new BadHttpRequestException("ModelState invalid");
            }
            else
            {
                bool status = await _service.ChangeUserPassword(changePassword.UserName, changePassword.OldPassword, changePassword.NewPassword);
                if (status)
                {
                    return Ok(new { message = "Password Changed Successfully" });
                }
                else
                {
                    throw new HMSExceptions( "Unable to Change Password" );
                }
            }
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDTO)
        {
            if (!ModelState.IsValid)
            {
                throw new BadHttpRequestException("ModelState invalid");
            }
            else
            {
                // Retrieve User-Agent from the request headers
                string userAgent = HttpContext.Request.Headers["User-Agent"];

                // You can use the 'userAgent' string as needed

                bool status = await _service.LoginUsersAsync(loginDTO);
                if (status)
                {
                    String roleName = await _service.GetRoleName(loginDTO);
                    int? userId = await _service.GetUserId(loginDTO);

                    Token token = _auth.CreateToken(loginDTO.UserName, roleName,userId);
                    bool refreshTokenStatus = await _service.RefreshTokenAsync(loginDTO.UserName, token,  userAgent);
                    return Ok(token);

                    if (refreshTokenStatus)
                    {
                        return Ok(token);

                    }
                    else
                    {
                        throw new HMSExceptions("Not Authorized ");
                    }
                }
                else
                {
                    throw new HMSExceptions("Inner Correct UserName or Password");
                }
            }
        }

        [HttpPost("Refresh")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Refresh([FromBody] Token token)
        {
            if (!ModelState.IsValid)
            {
                throw new BadHttpRequestException("Invalid Tokens");
            }
            else
            {
                // Retrieve User-Agent from the request headers
                string userAgent = HttpContext.Request.Headers["User-Agent"];

                var principal = _auth.GetClaimsPrincipal(token.AccessToken);
                string roleName = principal.FindFirst(ClaimTypes.Role)?.Value;
                string userName = principal.Identity?.Name;
                int userId = await _auth.GetUserIdFromToken(token.AccessToken);

                Token newToken = _auth.CreateToken(userName, roleName,userId);
                bool refreshTokenStatus = await _service.RefreshTokenAsync(userName, newToken, userAgent);

                if (refreshTokenStatus)
                {
                    return Ok(newToken);
                }
                else
                {
                    throw new HMSExceptions("Not Authorized");
                }
            }
        }
    }
}
