using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using Speridian.HMS.DataAccessLayer.Repositories;
using System.Diagnostics.Eventing.Reader;
using System.Threading.Tasks;

namespace Speridian.HMS.BusinessLayer.Services
{
    public class LoginUserService
    {
        private readonly LoginUserRepo _repo;
        private readonly IMapper _mapper;

        public LoginUserService(LoginUserRepo repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }

        public async Task<bool> AddUsersAsync(UserDto user)
        {
            await _repo.AddUsersAsync(_mapper.Map<User>(user));
            return true;
        }

        public async Task<bool> LoginUsersAsync(LoginDto loginDTO)
        {
            return await _repo.LoginUserAsync(loginDTO);
        }
        public async Task<bool> RefreshTokenAsync(string userName, Token token, string userAgent)
        {
            return await _repo.RefreshTokenAsync(userName, token, userAgent);
        }

        public async Task<string> GetRoleName(LoginDto loginDTO)
        {
            return await _repo.GetRoleName(loginDTO);
        }

        public async Task<int?>GetUserId(LoginDto loginDto)
        {
            return await _repo.GetUserId(loginDto);
        }

        public async Task<bool> ChangeUserPassword(string Username, string oldpassword, string newpassword)
        {
            await _repo.UsersChangePassword(Username, oldpassword, newpassword);
            return true;
        }
    }
}
