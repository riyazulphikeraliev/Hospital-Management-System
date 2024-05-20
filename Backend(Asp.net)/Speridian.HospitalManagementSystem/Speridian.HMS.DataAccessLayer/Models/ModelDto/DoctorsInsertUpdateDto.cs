using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models.ModelDto
{
    public class DoctorsInsertUpdateDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public int? SpecializationID { get; set; }

        public string? ContactNumber { get; set; }

        public string? Email { get; set; }

        public string? Address { get; set; }
        public string? ImagePath { get; set; }
        public string? DateOfBirth { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
