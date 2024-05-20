using System;
using System.Collections.Generic;

namespace Speridian.HMS.DataAccessLayer.Models;

public partial class UserRefreshToken
{
    public int Id { get; set; }

    public string UserName { get; set; } = null!;

    public string RefreshToken { get; set; } = null!;

    public string? DeviceIdentifier { get; set; }

    public DateTime? CreatedOn { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public bool? IsActive { get; set; }
}
