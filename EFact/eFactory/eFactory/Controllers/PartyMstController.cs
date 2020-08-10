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
    public class PartyMstController : ControllerBase
    {
        private readonly appIdentityDbContext _context;

        public PartyMstController(appIdentityDbContext context)
        {
            _context = context;

        }

        [Route("SaveParty")]
        [HttpPost]
        public async Task<ActionResult<Party>> SaveParty([FromBody]Party party)
        {
            if (ModelState.IsValid)
            {
                
                
                if (party.PartyName.Trim() == "")
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Party Name is required" } });
                }
                if (party.PartyTypeId==0)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Please Select Party Type" } });
                }
                if (party.Statusid == 0)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Please Select status" } });
                }
                var partyExist = _context.Party.FirstOrDefault(a => a.PartyName.ToLower() == party.PartyName.ToLower());
                if (partyExist != null)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Party Name is in use" } });
                }
                var MobileNoExist = _context.Party.FirstOrDefault(a => a.MobileNo == party.MobileNo);
                if (MobileNoExist != null)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Mobile No is in use" } });
                }
                var EmailExist = _context.Party.FirstOrDefault(a => a.Email == party.Email);
                if (EmailExist != null)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Email is in use" } });
                }
                party.IsDelete = 0;
                await _context.Party.AddAsync(party);
                await _context.SaveChangesAsync();
                return Ok(party);
            }
            return BadRequest(ModelState);

        }

        [Route("GetPartyById/{Partyid}")]
        [HttpGet]
        public async Task<ActionResult<Party>> GetPartyById(int Partyid)
        {
            var party = await _context.Party.FirstOrDefaultAsync(a => a.id == Partyid && a.IsDelete == 0);
            return Ok(party);

        }

        [Route("DeletePartyById/{Partyid}")]
        [HttpDelete]
        public ActionResult<Party> DeletePartyById(int Partyid)
        {

            var PartyidInDb = _context.Party.FirstOrDefault(a => a.id == Partyid);
            PartyidInDb.IsDelete = 1;
            _context.SaveChanges();
            return Ok(PartyidInDb);

        }

        [Route("UpdateParty")]
        [HttpPut]
        public ActionResult<Party> UpdateParty([FromBody]Party party)
        {
            if (ModelState.IsValid)
            {
                if (party.PartyName.Trim() == "")
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Party Name is required" } });
                }
                if (party.PartyTypeId == 0)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Please Select Party Type" } });
                }
                if (party.Statusid == 0)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Please Select status" } });
                }

                var partyInDb = _context.Party.FirstOrDefault(a => a.id == party.id);
                partyInDb.PartyName = party.PartyName;
                partyInDb.Address = party.Address;
                partyInDb.City = party.City;
                partyInDb.State = party.State;
                partyInDb.MobileNo = party.MobileNo;
                partyInDb.Email = party.Email;
                partyInDb.PartyTypeId = party.PartyTypeId;
                partyInDb.Statusid = party.Statusid;

                _context.SaveChanges();
                return Ok(partyInDb);
            }
            return BadRequest(ModelState);
        }

        [Route("GetAllparty")]
        [HttpGet]
        public async Task<ActionResult<List<Party>>> GetAllparty()
        {
            var PartyList = await _context.Party.Where(a => a.IsDelete == 0).ToListAsync();
            return Ok(PartyList);

        }
    }
}