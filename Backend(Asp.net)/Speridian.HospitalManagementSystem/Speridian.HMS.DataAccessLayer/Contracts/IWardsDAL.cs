using Speridian.HMS.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Speridian.HMS.DataAccessLayer.Contracts
{
    public interface IWardsDAL
    {

        public Task<List<Ward>> GetWards(int? id, string? wardType, int? capacity, int? currentOccupancy);
        public Task<bool> InsertUpdate(Ward ward, string username);
        public Task<bool> DeleteWard(int? id, string? wardType);
    }
}
