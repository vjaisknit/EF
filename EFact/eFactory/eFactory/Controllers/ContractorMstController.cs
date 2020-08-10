using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eFactory.Data;
using eFactory.Errors;
using eFactory.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eFactory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractorMstController : ControllerBase
    {
        private readonly appIdentityDbContext _context;

        public ContractorMstController(appIdentityDbContext context)
        {
            _context = context;

        }

        [Route("SaveContractor")]
        [HttpPost]
        public async Task<ActionResult<Contractor>> SaveContractor([FromBody]Contractor contractor)
        {
            if (ModelState.IsValid)
            {
                if (contractor.status == 0)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Please Select status" } });
                }
                var mobileNo = _context.Contractor.FirstOrDefault(a => a.MobileNumber == contractor.MobileNumber);
                if (mobileNo != null)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Mobile Number is in use" } });
                }
                var email = _context.Contractor.FirstOrDefault(a => a.Email == contractor.Email);
                if (email != null)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Email is in use" } });
                }

                contractor.IsDelete = 0;
                await _context.Contractor.AddAsync(contractor);
                await _context.SaveChangesAsync();
                return Ok(contractor);
            }
            return BadRequest(ModelState);

        }

        [Route("GetContractorbyId/{ContractorbyId}")]
        [HttpGet]
        public async Task<ActionResult<ItemSeries>> GetContractorbyId(int ContractorbyId)
        {
            var contractor = await _context.Contractor.FirstOrDefaultAsync(a => a.id == ContractorbyId && a.IsDelete == 0);
            return Ok(contractor);

        }

        [Route("DeleteContractorbyId/{ContractorbyId}")]
        [HttpDelete]
        public ActionResult<ItemSeries> DeleteContractorbyId(int ContractorbyId)
        {

            var contractorInDb = _context.Contractor.FirstOrDefault(a => a.id == ContractorbyId);
            contractorInDb.IsDelete = 1;
            _context.SaveChanges();
            return Ok(contractorInDb);

        }

        [Route("UpdateContractor")]
        [HttpPut]
        public ActionResult<ItemSeries> UpdateContractor([FromBody]Contractor contractor)
        {
            if (ModelState.IsValid)
            {
                if (contractor.status == 0)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Please Select status" } });
                }
                //var mobileNo = _context.Contractor.FirstOrDefault(a => a.MobileNumber == contractor.MobileNumber);
                //if (mobileNo != null)
                //{
                //    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Mobile Number is in use" } });
                //}
                //var email = _context.Contractor.FirstOrDefault(a => a.Email == contractor.Email);
                //if (email != null)
                //{
                //    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Email is in use" } });
                //}

                contractor.IsDelete = 0;
                var ContractorInDb = _context.Contractor.FirstOrDefault(a => a.id == contractor.id);
                ContractorInDb.ContractorName = contractor.ContractorName;
                ContractorInDb.MobileNumber = contractor.MobileNumber;
                ContractorInDb.Email = contractor.Email;
                ContractorInDb.status = contractor.status;
                _context.SaveChanges();
                return Ok(contractor);
            }
            return BadRequest(ModelState);
        }

        [Route("GetAllContractor")]
        [HttpGet]
        public async Task<ActionResult<List<ItemSeries>>> GetAllContractor()
        {
            var ContractorList = await _context.Contractor.Where(a => a.IsDelete == 0).ToListAsync();
            return Ok(ContractorList);

        }
    }
}