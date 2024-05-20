using System;
using System.Collections.Generic;

namespace Speridian.HMS.DataAccessLayer.Models;

public partial class Patient
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateTime? DateOfBirth { get; set; }

    public string? Gender { get; set; }

    public string? ContactNumber { get; set; }

    public string? Email { get; set; }

    public string? Address { get; set; }
    public string? ImagePath { get; set; }
    public int? UserId { get; set; }
    public string? UserName { get; set; }
    public string? Password { get; set; }
    public string? RoleName { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Admission> Admissions { get; } = new List<Admission>();

    public virtual ICollection<Appointment> Appointments { get; } = new List<Appointment>();

    public virtual ICollection<Billing> Billings { get; } = new List<Billing>();

    public virtual ICollection<MedicalRecord> MedicalRecords { get; } = new List<MedicalRecord>();
    public virtual User? User { get; set; }
    //public virtual Role? Role { get; set; }
}
