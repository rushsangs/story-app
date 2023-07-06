using Microsoft.EntityFrameworkCore;

namespace story_app.Models;

public class DropdownRowContext : DbContext
{
    public DropdownRowContext(DbContextOptions<DropdownRowContext> options)
        : base(options)
    {
        // this.DropdownRows.AddRange(DropdownRowSupport.CreateStartupDropdowns("/HeadSpace2/Tests/TestData/domain2.json"));
    }

    public DbSet<DropdownRow> DropdownRows { get; set; } = null!;
}