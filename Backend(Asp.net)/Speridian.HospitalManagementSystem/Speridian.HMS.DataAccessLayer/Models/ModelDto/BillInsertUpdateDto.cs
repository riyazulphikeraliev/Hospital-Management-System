using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models.ModelDto
{
    public class BillInsertUpdateDto
    {
        public int? Id { get; set; }

        public int? PatientId { get; set; }

        public int? DoctorId { get; set; }

        public DateTime? BillDate { get; set; }

        public decimal? TotalAmount { get; set; }

        public string? PaymentStatus { get; set; }

    }
}
