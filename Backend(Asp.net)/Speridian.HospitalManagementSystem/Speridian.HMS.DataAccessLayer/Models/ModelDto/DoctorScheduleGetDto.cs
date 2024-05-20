using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models.ModelDto
{
    public class DoctorScheduleGetDto
    {
        public int ID { get; set; }

        public string? DoctorFullName { get; set; }

        public string? DayOfWeek { get; set; }


        public TimeSpan? StartTime { get; set; }

        public TimeSpan? EndTime { get; set; }
        public int? AppointmentSlots { get; set; }

    }
}
