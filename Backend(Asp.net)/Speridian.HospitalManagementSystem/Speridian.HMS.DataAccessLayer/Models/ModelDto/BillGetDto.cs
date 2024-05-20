using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models.ModelDto
{
    public class BillGetDto
    {
        public int Id { get; set; }
        public int PatientId { get; set; }

        public string? PatientFullName { get; set; }
        public string? DoctorId { get; set; }

        public string? DoctorFullName { get; set; }

        public DateTime? BillDate { get; set; }

        public decimal? TotalAmount { get; set; }

        public string? PaymentStatus { get; set; }


    }
}
