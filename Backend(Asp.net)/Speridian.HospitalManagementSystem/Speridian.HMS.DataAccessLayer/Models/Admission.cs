using System;
using System.Collections.Generic;

namespace Speridian.HMS.DataAccessLayer.Models;

public partial class Admission
{
    public int Id { get; set; }

    public int? PatientId { get; set; }
    public string PatientFullName { get; set; }


    public DateTime? AdmissionDate { get; set; }

    public DateTime? DischargeDate { get; set; }

    public int? WardNumber { get; set; }
    public int? WardId{ get; set; }
    public string? WardType { get; set; }

    public int? DoctorId { get; set; }
    public string? DoctorFullName { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public bool? IsActive { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual Patient? Patient { get; set; }
    public virtual Ward? Ward { get; set; }
}
