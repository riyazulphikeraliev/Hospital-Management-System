using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Models
{
    public class BillingDataForGraphsView
    {
        public int? BillingYear { get; set; }
        public int? BillingMonth { get; set; }
        public string? MonthName { get; set; }
        public decimal? TotalAmount { get; set; }
    }
}
