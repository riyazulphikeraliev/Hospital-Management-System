using AutoMapper;
using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using Speridian.HMS.DataAccessLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.BusinessLayer.Services
{
    public class BillingService
    {
        private readonly BillingRepo _repo;
        private readonly IMapper _mapper;

        public BillingService(BillingRepo repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }

        public async Task<List<BillGetDto>> GetBillingRecordsAsync(int? id, string? patientname, string? doctorname, DateTime? billDate, decimal? totalAmount, string? paymentStatus, int? patid, int? docid)
        {
            return _mapper.Map<List<BillGetDto>>(await _repo.GetBillingRecordsAsync(id, patientname, doctorname, billDate, totalAmount, paymentStatus,patid,docid));
        }

        public async Task<List<BillingDataForGraphsView>> GetBillForGraph(DateTime? StartDate, DateTime? EndDate)
        {
            return await _repo.GetBillsForGraph(StartDate,EndDate);
        }

        public async Task<bool> InsertUpdateBilling(BillInsertUpdateDto billing, string username)
        {
            return await _repo.InsertUpdateBilling(_mapper.Map<Billing>(billing), username);
        }

        public async Task<bool> DeleteBilling(int? id, string? patientFullName, string? doctorFullName, DateTime? billDate, decimal? totalAmount, string? paymentStatus)
        {
            return await _repo.DeleteBilling(id, patientFullName, doctorFullName, billDate, totalAmount, paymentStatus);
        }

    }
}
