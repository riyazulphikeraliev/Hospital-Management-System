using System;
using System.Collections.Generic;

namespace Speridian.HMS.DataAccessLayer.Models;

public partial class Token
{
    // public int Id { get; set; }
    
    public string AccessToken { get; set; } = null!;

    public string RefreshToken { get; set; } = null!;
    public string RoleName { get; set; } = null!;
    public int? UserId { get; set; } 

}
