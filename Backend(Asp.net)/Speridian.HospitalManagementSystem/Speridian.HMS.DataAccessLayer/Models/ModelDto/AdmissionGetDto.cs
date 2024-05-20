using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models.ModelDto
{
    public class AdmissionGetDto
    {
        public int Id { get; set; }
        public int patientId { get; set; }
        public string? PatientFullName { get; set; }
        public int? doctorId { get; set; }
        public string? DoctorFullName { get; set; }
        public string? wardId { get; set; }
        public string? WardType { get; set; }
        public int? WardNumber { get; set; }

        public DateTime? AdmissionDate { get; set; }

        public DateTime? DischargeDate { get; set; }

    }
}
