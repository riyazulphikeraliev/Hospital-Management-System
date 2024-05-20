using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models.ModelDto
{
    public class SpecializationDto
    {
        public int Id { get; set; }

        public string SpecializationName { get; set; } = null!;
        public string? ImagePath { get; set; }
    }
}
