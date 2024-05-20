using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models
{
    public class UserModel
    {
        public int? UserID { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string UserName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public int RoleId { get; set; }
        public string RoleName { get; set; } = null!;
        public virtual Role? Role { get; set; }
        public string? ContactNumber { get; set; }
        public string? ImagePath { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? SpecializationID { get; set; }
        public string? Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public bool? IsActive { get; set; }
    }

    public class DoctorModel : UserModel
    {
    
    }

    public class AdminModel : UserModel
    {
    }

    public class PatientModel : UserModel
    {
        public DateTime? DateOfBirth { get; set; }


    }

}
