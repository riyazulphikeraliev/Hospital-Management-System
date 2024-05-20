using Speridian.HMS.DataAccessLayer.Models;
using System.Security.Claims;

namespace Speridian.HMS.Helpers
{
    public interface IAuthorize
    {
        Token CreateToken(string username, string rolename,int? userId);
        string CreateAccessToken(string username,string rolename, int? userId);
        string GetRefreshToken();
        ClaimsPrincipal GetClaimsPrincipal(string accessToken);
    }
}
