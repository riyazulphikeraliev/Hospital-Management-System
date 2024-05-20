using System;
using System.Collections.Generic;

namespace Speridian.HMS.DataAccessLayer.Models;

public partial class Ward
{
    public int Id { get; set; }

    public string? WardType { get; set; }

    public int? Capacity { get; set; }
    public int? AvailableBeds { get; set; }


    public int? CurrentOccupancy { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Admission> Admissions { get; } = new List<Admission>();
}
