using Microsoft.EntityFrameworkCore;

namespace story_app.Models;

public class DropdownRowContext : DbContext
{
    public DropdownRowContext(DbContextOptions<DropdownRowContext> options)
        : base(options)
    {
    }

    public DbSet<DropdownRow> DropdownRows { get; set; } = null!;
}