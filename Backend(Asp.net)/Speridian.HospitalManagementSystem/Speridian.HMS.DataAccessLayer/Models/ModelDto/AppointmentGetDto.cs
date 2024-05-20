using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models.ModelDto
{
    public class AppointmentGetDto
    {
        public int Id { get; set; }

        public int? ScheduleId { get; set; }
        public int? PatientId { get; set; }

        public int? DoctorId { get; set; }

        public DateTime? AppointmentDate { get; set; }

        public TimeSpan? AppointmentTime { get; set; }

        public string? Status { get; set; }
        public string? DoctorFullName { get; set; }

        public string? PatientFullName { get; set; }
        public string? SpecializationName { get; set; }


    }
}
