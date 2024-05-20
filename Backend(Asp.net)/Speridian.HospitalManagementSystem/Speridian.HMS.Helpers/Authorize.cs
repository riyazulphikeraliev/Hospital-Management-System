using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Speridian.HMS.Helpers
{
    public class Authorize : IAuthorize  
    {
        private readonly IConfiguration _config;
        public Authorize(IConfiguration config) 
        {
            this._config = config;
        }
        public string CreateAccessToken(string username,string rolename,int? userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["JWT:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role,rolename),
                    new Claim("UserId", userId.ToString())
                }),
                Issuer = "Issuer",
                Audience = "Audience",
                Expires = DateTime.Now.AddMinutes(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var accessToken = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            return tokenHandler.WriteToken(accessToken);
        } 
        public Token CreateToken(string username,string rolename,int? UserId)
        {
            Token tokens = new Token()
            {
                AccessToken = CreateAccessToken(username,rolename,UserId),
                RefreshToken = GetRefreshToken(),
                RoleName=rolename,
                UserId=UserId
            };
            return tokens;
        }
        public ClaimsPrincipal GetClaimsPrincipal(string accessToken)
        {
            var key = Encoding.UTF8.GetBytes(_config["JWT:Key"]);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenValidationParameters = new TokenValidationParameters()
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false,
                ClockSkew = TimeSpan.Zero,
                ValidAudience = "Audience",
                ValidIssuer = "Issuer",
                ValidateIssuerSigningKey = true
            };
            var principal = tokenHandler.ValidateToken(accessToken, tokenValidationParameters, out SecurityToken claimPrincipalData);
            JwtSecurityToken jwtSecurityToken = claimPrincipalData as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new HMSExceptions("Invalid Token");
            }
            else
            {
                return principal;
            }
        }
        public string GetRefreshToken()
        {
            var randomNumber = new Byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public async Task<string> GetUserNameFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jtoken = tokenHandler.ReadJwtToken(token) as JwtSecurityToken;
            return jtoken.Claims.FirstOrDefault(x => x.Type == "unique_name").Value;
        }
        public async Task<int> GetUserIdFromToken(string accessToken)
        {
            var principal = GetClaimsPrincipal(accessToken);
            var userIdClaim = principal.FindFirst("UserId");
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
            {
                return userId;
            }
            return -1; // Default or error value
        }

    }
}
