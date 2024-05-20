using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models.ModelDto
{
    public class AdmissionInsertUpdateDto
    {
        public int Id { get; set; }
        public int? PatientId { get; set; }
        public DateTime? AdmissionDate { get; set; }
        public DateTime? DischargeDate { get; set; }
        public int? WardNumber { get; set; }
        public int? WardId { get; set; }

        public int? DoctorId { get; set; }
    }
}
