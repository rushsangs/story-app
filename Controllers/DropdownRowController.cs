using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using story_app.Models;

namespace story_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DropdownRowController : ControllerBase
    {
        private readonly DropdownRowContext _context;

        public DropdownRowController(DropdownRowContext context)
        {
            _context = context;
        }

        // GET: api/DropdownRow
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DropdownRow>>> GetDropdownRows()
        {
          
            if (_context.DropdownRows == null)
            {
                return NotFound();
            }
            // if (!_context.DropdownRows.Any())
            // {
            //    _context.DropdownRows.AddRange(DropdownRowSupport.CreateStartupDropdowns("/HeadSpace2/Tests/TestData/domain2.json"));   
            // }
            return await _context.DropdownRows.ToListAsync();
        }

        // GET: api/DropdownRow/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DropdownRow>> GetDropdownRow(long id)
        {
          if (_context.DropdownRows == null)
          {
              return NotFound();
          }
            var dropdownRow = await _context.DropdownRows.FindAsync(id);

            if (dropdownRow == null)
            {
                return NotFound();
            }

            return dropdownRow;
        }

        // PUT: api/DropdownRow/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDropdownRow(long id, DropdownRow dropdownRow)
        {
            if (id != dropdownRow.RowId)
            {
                return BadRequest();
            }

            _context.Entry(dropdownRow).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DropdownRowExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DropdownRow
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DropdownRow>> PostDropdownRow(DropdownRow dropdownRow)
        {
          if (_context.DropdownRows == null)
          {
              return Problem("Entity set 'DropdownRowContext.DropdownRows'  is null.");
          }
            _context.DropdownRows.Add(dropdownRow);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDropdownRow", new { id = dropdownRow.RowId }, dropdownRow);
        }

        // DELETE: api/DropdownRow/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDropdownRow(long id)
        {
            if (_context.DropdownRows == null)
            {
                return NotFound();
            }
            var dropdownRow = await _context.DropdownRows.FindAsync(id);
            if (dropdownRow == null)
            {
                return NotFound();
            }

            _context.DropdownRows.Remove(dropdownRow);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DropdownRowExists(long id)
        {
            return (_context.DropdownRows?.Any(e => e.RowId == id)).GetValueOrDefault();
        }
    }
}
