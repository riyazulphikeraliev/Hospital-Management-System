using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models.ModelDto
{
    public class WardDto
    {
        public int Id { get; set; }

        public string? WardType { get; set; }

        public int? Capacity { get; set; }

        public int? CurrentOccupancy { get; set; }
        public int? AvailableBeds { get; set; }



    }
}
