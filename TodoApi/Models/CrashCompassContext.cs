using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models;

public class CrashCompassContext : DbContext
{
    public CrashCompassContext(DbContextOptions<CrashCompassContext> options)
        : base(options)
    {
    }

    public DbSet<TodoItem> TodoItems { get; set; } = null!;
}