using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models.ModelDto
{
    public class ChangePasswordDto
    {
        public string? UserName{ get; set; }

        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
