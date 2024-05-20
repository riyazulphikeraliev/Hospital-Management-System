using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models.ModelDto
{
    public class MedicalRecordsGetDto
    {
        public int Id { get; set; }
        public int? SpecializationId { get; set; }

        public string? SpecializationName { get; set; }

        public DateTime? Date { get; set; }

        public int? PatientId { get; set; }

        public string? PatientFullName { get; set; }

        public int? DoctorId { get; set; }

        public string? DoctorFullName { get; set; }

        public string? Diagnosis { get; set; }

        public string? Prescription { get; set; }

        public string? TestResults { get; set; }
    }
}
