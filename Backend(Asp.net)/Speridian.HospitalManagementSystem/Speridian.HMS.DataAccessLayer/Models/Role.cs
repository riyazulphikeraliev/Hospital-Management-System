using System;
using System.Collections.Generic;

namespace Speridian.HMS.DataAccessLayer.Models;

public partial class Role
{
    public int Id { get; set; }

    public string RoleName { get; set; } = null!;

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Staff> Staff { get; } = new List<Staff>();

    public virtual ICollection<User> Users { get; } = new List<User>();
}
