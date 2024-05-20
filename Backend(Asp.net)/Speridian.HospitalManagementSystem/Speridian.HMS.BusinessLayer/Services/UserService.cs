using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using Speridian.HMS.DataAccessLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.BusinessLayer.Services
{
    public class UserService
    {
        private UsersRepo _userRepo;
        public UserService(UsersRepo userRepo)
        {
            _userRepo = userRepo;
        }
        public async Task<(string RoleName, int ID)> GetUsersAsync(int UserId)
        {
            return await _userRepo.GetRoleAndIDByUserIDAsync(UserId);
        }
    }
}
