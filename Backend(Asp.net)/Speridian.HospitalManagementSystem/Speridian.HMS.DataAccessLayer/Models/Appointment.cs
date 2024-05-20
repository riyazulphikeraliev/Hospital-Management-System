using System;
using System.Collections.Generic;

namespace Speridian.HMS.DataAccessLayer.Models;

public partial class Appointment
{
    public int Id { get; set; }

    public int? PatientId { get; set; }

    public int? DoctorId { get; set; }

    public int? ScheduleId { get; set; }
    public string? SpecializationName { get; set; }

    public DateTime? AppointmentDate { get; set; }

    public TimeSpan? AppointmentTime { get; set; }

    public string? Status { get; set; }

    public string? DoctorFullName{ get; set; }

    public string? PatientFullName { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public bool? IsActive { get; set; }

    public virtual Patient? Patient { get; set; }
    public virtual Doctor? Doctor { get; set; }

    public virtual DoctorSchedule? Schedule { get; set; }
}
