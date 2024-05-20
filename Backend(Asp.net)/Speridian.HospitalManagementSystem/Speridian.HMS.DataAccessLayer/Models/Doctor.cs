using System;
using System.Collections.Generic;

namespace Speridian.HMS.DataAccessLayer.Models;

public partial class Doctor
{
    public int Id { get; set; }

    public string FirstName { get; set; } 

    public string LastName { get; set; } 

    public int? SpecializationId { get; set; }

    public string? SpecializationName { get; set; }

    public string? ContactNumber { get; set; }

    public string? Email { get; set; }

    public string? Address { get; set; }
    public string? ImagePath { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public int? UserID { get; set; }
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
    public virtual ICollection<DoctorSchedule> DoctorSchedules { get; } = new List<DoctorSchedule>();

    public virtual Specialization? Specialization { get; set; }
    public virtual User? User { get; set; }
}
