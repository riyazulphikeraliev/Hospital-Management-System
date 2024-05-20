using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Contracts
{
    public interface ILoginUserDAL
    {
        public Task<bool> AddUsersAsync(User user);

        public Task<bool> LoginUserAsync(LoginDto loginDTO);

        /*public  Task<bool> RefreshTokenAsync(string userName, Token token);*/ 

            public Task<bool> RefreshTokenAsync(string userName, Token token, string userAgent);

        public Task<string> GetRoleName(LoginDto loginDTO);

    }
}
