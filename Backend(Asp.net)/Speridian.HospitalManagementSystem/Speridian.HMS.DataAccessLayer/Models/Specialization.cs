using System;
using System.Collections.Generic;

namespace Speridian.HMS.DataAccessLayer.Models;

public partial class Specialization
{
    public int Id { get; set; }

    public string SpecializationName { get; set; } = null!;
    public string? ImagePath { get; set; } = null!;

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Doctor> Doctors { get; } = new List<Doctor>();
}
