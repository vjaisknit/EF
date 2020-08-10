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
    public class ItemSeriesMstController : ControllerBase
    {
        private readonly appIdentityDbContext _context;

        public ItemSeriesMstController(appIdentityDbContext context)
        {           
            _context = context;
           
        }

        [Route("SaveItemSeries")]
        [HttpPost]
        public async Task<ActionResult<ItemSeries>> SaveItemSeries([FromBody]ItemSeries itemSeries)
        {
            if (ModelState.IsValid)
            {
                if(itemSeries.status==0)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Please Select status" } });
                }
                var itemSeriesExist = _context.ItemSeries.FirstOrDefault(a => a.Description.ToLower() == itemSeries.Description.ToLower());
                if (itemSeriesExist!= null)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Item Series is in use" } });
                }
                if (itemSeries.Description.Trim() =="")
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Item Series is required" } });
                }
                itemSeries.IsDelete = 0;
                await _context.ItemSeries.AddAsync(itemSeries);
                await _context.SaveChangesAsync();
                return Ok(itemSeries);
            }
            return BadRequest(ModelState);

        }

        [Route("GetItemSeriesById/{itemSeriesid}")]
        [HttpGet]
        public async Task<ActionResult<ItemSeries>> GetItemSeriesById(int itemSeriesid)
        {
            var itemSeries = await _context.ItemSeries.FirstOrDefaultAsync(a=> a.id == itemSeriesid && a.IsDelete == 0);
            return Ok(itemSeries);

        }

        [Route("DeleteItemSeriesById/{itemSeriesid}")]
        [HttpDelete]
        public ActionResult<ItemSeries> DeleteItemSeriesById(int itemSeriesid)
        {
            
            var itemSeriesInDb = _context.ItemSeries.FirstOrDefault(a => a.id == itemSeriesid );
            itemSeriesInDb.IsDelete = 1;
            _context.SaveChanges();
            return Ok(itemSeriesInDb);

        }

        [Route("UpdateItemSeries")]
        [HttpPut]
        public ActionResult<ItemSeries> UpdateItemSeries([FromBody]ItemSeries item)
        {
            if (ModelState.IsValid)
            {
                if (item.status == 0)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Please Select status" } });
                }
                //var itemSeriesExist = _context.ItemSeries.FirstOrDefault(a => a.Description.ToLower() == item.Description.ToLower());
                //if (itemSeriesExist != null)
                //{
                //    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Item Series is in use" } });
                //}
               
                var itemSeriesInDb = _context.ItemSeries.FirstOrDefault(a => a.id == item.id);
                itemSeriesInDb.Description = item.Description;
                itemSeriesInDb.status = item.status;
                _context.SaveChanges();
                return Ok(itemSeriesInDb);
            }
            return BadRequest(ModelState);
        }

        [Route("GetAllItemSeries")]
        [HttpGet]
        public async Task<ActionResult<List<ItemSeries>>> GetAllItemSeries()
        {
            var itemSeriesList = await _context.ItemSeries.Where(a=> a.IsDelete ==0).ToListAsync();
            return Ok(itemSeriesList);

        }
    }
}