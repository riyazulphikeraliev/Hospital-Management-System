using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models.ModelDto
{
    public class StaffGetDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string? Position { get; set; }

        public string? ContactNumber { get; set; }

        public string? Email { get; set; }

        public string? Address { get; set; }
        public string? RoleId { get; set; }

        public string? RoleName { get; set; }
    }
}
