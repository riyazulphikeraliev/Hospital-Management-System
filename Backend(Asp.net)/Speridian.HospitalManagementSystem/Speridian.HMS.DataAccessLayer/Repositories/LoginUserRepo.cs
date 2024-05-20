using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Speridian.HMS.DataAccessLayer.Contracts;
using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Repositories
{
    public class LoginUserRepo : ILoginUserDAL
    {
        HospitalManagementSystemWebapiContext _context;
        public LoginUserRepo(HospitalManagementSystemWebapiContext context)
        {
            this._context = context;
        }
        public async Task<bool> AddUsersAsync(User user)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync($"[USP_Users_InsertUser] @UserName={user.UserName}, @Password={user.Password}, @RoleName={user.RoleName}");

            return true;
        }

        public async Task<bool> LoginUserAsync(LoginDto loginDTO)
        {
            try
            {
                if (loginDTO == null || string.IsNullOrWhiteSpace(loginDTO.UserName) || string.IsNullOrWhiteSpace(loginDTO.Password))
                {

                    return false;
                }

                List<User> userList = await _context.Users
                    .FromSqlRaw($@"USP_Users_GetList @UserName={loginDTO.UserName}, @Password={loginDTO.Password}")
                    .ToListAsync();

                if (userList.Count > 0)
                {
                    if (userList[0].UserName == loginDTO.UserName && userList[0].Password == loginDTO.Password)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in LoginUserAsync: {ex.Message}");
            }
        }

        public async Task<List<UserRefreshToken>> GetUserRefreshTokensAsync(string userName, string userAgent)
        {
            string sqlQuery = "[dbo].[USP_UserRefreshTokens_Select] @Username={0}, @DeviceIdentifier={1}";
            Console.WriteLine($"Generated SQL Query: {sqlQuery}");

            return await _context.UserRefreshTokens
                .FromSqlRaw(sqlQuery, userName, userAgent)
                .ToListAsync();
        }

        public async Task<bool> RefreshTokenAsync(string userName, Token token, string userAgent)
        {
            List<UserRefreshToken> refreshTokens = await GetUserRefreshTokensAsync(userName, userAgent);

            if (refreshTokens.Count > 0 && refreshTokens[0].UserName == userName)
            {
                string sqlQuery = "[dbo].[USP_UserRefreshTokens_InsertUpdate] @Username={0}, @Token={1}, @DeviceIdentifier={2}, @INSERT={3}";
                Console.WriteLine($"Generated SQL Query: {sqlQuery}");

                int rows = await _context.Database.ExecuteSqlRawAsync(sqlQuery, userName, token.RefreshToken, userAgent, 0);
                return rows > 0;
            }
            else
            {
                string sqlQuery = "[dbo].[USP_UserRefreshTokens_InsertUpdate] @Username={0}, @Token={1}, @DeviceIdentifier={2}, @INSERT={3}";
                Console.WriteLine($"Generated SQL Query: {sqlQuery}");

                int rows = await _context.Database.ExecuteSqlRawAsync(sqlQuery, userName, token.RefreshToken, userAgent, 1);
                return rows > 0;
            }
        }

        public async Task<string> GetRoleName(LoginDto loginDTO)
        {
            List<User> userList = await _context.Users
                .FromSqlRaw($"USP_Users_GetList @UserName={loginDTO.UserName}, @Password={loginDTO.Password}")
                .ToListAsync();

            if (userList.Count > 0)
            {
                var rolename = userList[0].RoleName;
                return rolename;
            }

            return "DefaultRole";
        }

        public async Task<int?> GetUserId(LoginDto loginDTO)
        {
            List<User> userList = await _context.Users
                .FromSqlRaw($"USP_Users_GetList @UserName={loginDTO.UserName}, @Password={loginDTO.Password}")
                .ToListAsync();

            if (userList.Count > 0)
            {
                var userId = userList[0].Id;
                return userId;
            }

            return 0;
        }


        public async Task<bool> UsersChangePassword(string username, string oldpassword, string newpassword)
        {
            try
            {
                await _context.Database.ExecuteSqlInterpolatedAsync(
                    $"EXEC USP_Users_UpdatePasswordWithValidation @UserName={username}, @OldPassword={oldpassword}, @NewPassword={newpassword}, @UpdatedBy={username}");

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error changing password for user '{username}' using stored procedure: {ex.Message}");
                return false;
            }
        }
    }
}
