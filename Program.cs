using Microsoft.EntityFrameworkCore;
using NarrativePlanning.DomainBuilder;
using story_app.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
var app = builder.Build();


string path = Directory.GetCurrentDirectory();    
NarrativePlanning.DomainBuilder.JSONDomainBuilder domain = new NarrativePlanning.DomainBuilder.JSONDomainBuilder(path + "/HeadSpace2/Tests/TestData/domain2.json");
StaticDropdownItems.Populate();

app.MapGet("/storygenerator", async() =>
{
    Tuple<NarrativePlanning.WorldState, NarrativePlanning.WorldState, List<NarrativePlanning.Operator>> compiled_tuple = NarrativePlanning.PAC.PAC_C(domain.initial, domain.goal, domain.operators, domain.middle);
    NarrativePlanning.PlanningProblem problem = new NarrativePlanning.PlanningProblem(compiled_tuple.Item1, compiled_tuple.Item2, compiled_tuple.Item3, domain.desires, domain.counterActions, domain.middle);
    NarrativePlanning.Plan plan = problem.HeadSpaceXSolution();
    if (plan == null)
        return Results.Created("/storygenerator/1", new List<string>());
    else
        return Results.Created("/storygenerator/1", plan.steps.Select(s=>s.Item1).ToArray());
});

app.MapPost("/storygenerator", async (List<DropdownRow> allrows) =>
{
    DropdownRowSupport.parseDropdownsIntoDomain(allrows, domain);
    Tuple<NarrativePlanning.WorldState, NarrativePlanning.WorldState, List<NarrativePlanning.Operator>> compiled_tuple = NarrativePlanning.PAC.PAC_C(domain.initial, domain.goal, domain.operators, domain.middle);
    NarrativePlanning.PlanningProblem problem = new NarrativePlanning.PlanningProblem(compiled_tuple.Item1, compiled_tuple.Item2, compiled_tuple.Item3, domain.desires, domain.counterActions, domain.middle);
    NarrativePlanning.Plan plan = problem.HeadSpaceXSolution();
    if (plan == null)
        return Results.Created("/storygenerator/1", new List<string>());
    else
        return Results.Created("/storygenerator/1", plan.steps.Select(s=>s.Item1).ToArray());
});

app.MapGet("/dropdowns", async () =>
    {
        List<DropdownRow> rows = DropdownRowSupport.CreateStartupDropdowns(domain);
        return Results.Ok(rows);
    }); 

app.MapPost("/dropdowns", async (DropdownItemRequest dItemRequest) =>
{
    List<DropdownItemResponse> responses = StaticDropdownItems.GetNextDropdownItem(dItemRequest, domain);
    return Results.Created("/dropdowns/1", responses);   
});

///////// REFERENCE CODE ////////
app.MapGet("/todoitems/complete", async (TodoDb db) =>
    await db.Todos.Where(t => t.IsComplete).Select(x => new TodoItemDTO(x)).ToListAsync());

app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(new TodoItemDTO(todo))
            : Results.NotFound());



app.MapPut("/todoitems/{id}", async (int id, TodoItemDTO inputTodoDTO, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodoDTO.Name;
    todo.IsComplete = inputTodoDTO.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/todoitems/{id}", async (int id, TodoDb db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.Ok(todo);
    }

    return Results.NotFound();
});

app.Run();

public class Todo
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
    public string? Secret { get; set; }
}

public class TodoItemDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }

    public TodoItemDTO() { }
    public TodoItemDTO(Todo todoItem) =>
    (Id, Name, IsComplete) = (todoItem.Id, todoItem.Name, todoItem.IsComplete);
}

class TodoDb : DbContext
{
    public TodoDb(DbContextOptions<TodoDb> options)
        : base(options) { }

    public DbSet<Todo> Todos => Set<Todo>();
}