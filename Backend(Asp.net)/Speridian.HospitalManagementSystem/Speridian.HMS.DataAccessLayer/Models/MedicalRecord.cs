using System;
using System.Collections.Generic;

namespace Speridian.HMS.DataAccessLayer.Models;

public partial class MedicalRecord
{
    public int Id { get; set; }
    public int SpecializationId { get; set; }
    public string? SpecializationName { get; set; }

    public DateTime? Date { get; set; }

    public int? PatientId { get; set; }

    public string? PatientFullName { get; set; }

    public int? DoctorId { get; set; }

    public string? DoctorFullName { get; set; }

    public string? Diagnosis { get; set; }

    public string? Prescription { get; set; }

    public string? TestResults { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public bool? IsActive { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual Patient? Patient { get; set; }

    public virtual Specialization? Specialization { get; set; }
}
