using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Speridian.HMS.BusinessLayer.Services;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;
using Speridian.HMS.Helpers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Speridian.HMS.PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly BillingService _service;
        Authorize _auth;

        public BillController(BillingService service, Authorize auth)
        {
            this._service = service;
            this._auth = auth;
        }

        [HttpGet("Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin,Receptionist,Patient,Doctor")]
        public async Task<IActionResult> GetBillingRecordsAsync(int? id, string? patientname, string? doctorname, DateTime? billDate, decimal? totalAmount, string? paymentStatus, int? patid, int? docid)
        {
            try
            {
                // Validate input parameters if needed

                var billingRecords = await _service.GetBillingRecordsAsync(id, patientname, doctorname, billDate, totalAmount, paymentStatus,patid,docid);
                return Ok(billingRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("ForGraph")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetBillForGraph(DateTime? StartDate, DateTime? EndDate)
        {
            try
            {
   
            var billingRecords = await _service.GetBillForGraph(StartDate, EndDate);
            return Ok(billingRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost("Post")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin,Receptionist,Nurse")]
        public async Task<IActionResult> InsertBilling(BillInsertUpdateDto billing)
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var userName = await _auth.GetUserNameFromToken(token);
                // Validate input model
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid Model State");
                }

                bool success = await _service.InsertUpdateBilling(billing, userName);
                if (success)
                {
                    return Ok(new { message = "Billing record inserted successfully" });
                }
                else
                {
                    return BadRequest("Failed to insert billing record");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPut("Put")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin,Receptionist")]
        public async Task<IActionResult> UpdateBilling(BillInsertUpdateDto billing)
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var userName = await _auth.GetUserNameFromToken(token);
                // Validate input model
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid Model State");
                }

                bool success = await _service.InsertUpdateBilling(billing, userName);
                if (success)
                {
                    return Ok(new { message = "Billing record updated successfully" });
                }
                else
                {
                    return BadRequest("Failed to update billing record");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete("Delete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteBilling(int? id, string? patientFullName, string? doctorFullName, DateTime? billDate, decimal? totalAmount, string? paymentStatus)
        {
            try
            {
                // Validate input parameters if needed

                bool success = await _service.DeleteBilling(id, patientFullName, doctorFullName, billDate, totalAmount, paymentStatus);
                if (success)
                {
                    return Ok(new { message = "Billing record deleted successfully" });
                }
                else
                {
                    return BadRequest("Failed to delete billing record");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
