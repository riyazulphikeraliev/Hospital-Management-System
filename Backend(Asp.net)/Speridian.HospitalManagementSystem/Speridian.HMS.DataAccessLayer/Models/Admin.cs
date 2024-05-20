using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models
{
    public  class Admin
    {
        public int? Id { get; set; }
        public int? UserId { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? ContactNumber { get; set; }
        public string? ImagePath { get; set; }
        public string? Address { get; set; } 
        public DateTime? DateOfBirth { get; set; } 
        public string? RoleName { get; set; }
        public int? RoleId { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool IsActive { get; set; }

        // Navigation property
        public User User { get; set; }

    }
}
