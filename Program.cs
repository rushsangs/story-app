using HeadSpace.TextMaker;
using Microsoft.EntityFrameworkCore;
using NarrativePlanning.DomainBuilder;
using story_app.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin();
                        builder.AllowAnyHeader();
                        builder.AllowAnyMethod();
                    });
            });
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
var app = builder.Build();


string path = Directory.GetCurrentDirectory();    
NarrativePlanning.DomainBuilder.JSONDomainBuilder domain = new NarrativePlanning.DomainBuilder.JSONDomainBuilder(path + "/HeadSpace2/HeadSpace/JSON Files/microwave-teddy.json");
NarrativePlanning.PlanningProblem problem = null;
HeadSpace.TextMaker.TextMaker textmaker = new HeadSpace.TextMaker.TextMaker(path + "/HeadSpace2/HeadSpace/JSON Files/action_texts.json");
StaticDropdownItems.Populate();
StudyLogger studyLogger = new StudyLogger(path + "/StudyData");

app.MapGet("/storygenerator", async() =>
{
    Tuple<NarrativePlanning.WorldState, NarrativePlanning.WorldState, List<NarrativePlanning.Operator>> compiled_tuple = NarrativePlanning.PAC.PAC_C(domain.initial.clone(), domain.goal.clone(), domain.operators, domain.middle);
    NarrativePlanning.PlanningProblem problem = new NarrativePlanning.PlanningProblem(compiled_tuple.Item1, compiled_tuple.Item2, compiled_tuple.Item3, domain.desires, domain.counterActions, domain.middle);
    NarrativePlanning.Plan plan = problem.HeadSpaceXSolution();
    if (plan == null)
        return Results.Created("/storygenerator/1", new List<string>());
    else
        return Results.Created("/storygenerator/1", textmaker.convertPlan(plan.steps.Select(s=>s.Item1)).ToArray());
});

app.MapPost("/storygenerator", async (List<DropdownRow> allrows) =>
{
    studyLogger.AppendTextToFile("STORY GENERATION REQUEST");
    allrows = DropdownRowSupport.ExpandDropdowns(allrows);
    var old_domain = domain.cloneForTrackingChanges();
    DropdownRowSupport.parseDropdownsIntoDomain(allrows, domain);
    if(problem == null || domain.hasChanged(old_domain))
    {
        Tuple<NarrativePlanning.WorldState, NarrativePlanning.WorldState, List<NarrativePlanning.Operator>> compiled_tuple = NarrativePlanning.PAC.PAC_C(domain.initial.clone(), domain.goal.clone(), domain.operators, domain.middle);
        problem = new NarrativePlanning.PlanningProblem(compiled_tuple.Item1, compiled_tuple.Item2, compiled_tuple.Item3, domain.desires, domain.counterActions, domain.middle);
    }

    NarrativePlanning.Plan plan = problem.HeadSpaceXSolution();
    if (plan == null)
    {
        studyLogger.AppendTextToFile("Story not produced!");
        return Results.Created("/storygenerator/1", new List<string>());
    }
    else
    {
        studyLogger.AppendTextToFile("Story produced!");
        List<string> c = textmaker.convertPlan(plan.steps.Select(s=>s.Item1));
        studyLogger.AppendTextToFile(c.ToString());
        return Results.Created("/storygenerator/1", c.ToArray());
    }
});

app.MapGet("/dropdowns/1", async () =>
{
    studyLogger.AppendTextToFile("----------Task 1----------");
    List<DropdownRow> rows = APISupport.GetInitialDropdowns(path +   "/HeadSpace2/HeadSpace/JSON Files/microwave-teddy.json", domain, textmaker);
    return Results.Ok(rows);
});

app.MapGet("/dropdowns/2", async () =>
    {
        studyLogger.AppendTextToFile("----------Task 2----------");
        List<DropdownRow> rows = APISupport.GetInitialDropdowns(path +  "/HeadSpace2/HeadSpace/JSON Files/microwave-task2.json", domain, textmaker);
        return Results.Ok(rows);
    }); 

app.MapGet("/dropdowns/3", async () =>
    {
        studyLogger.AppendTextToFile("----------Task 3----------");
        List<DropdownRow> rows = APISupport.GetInitialDropdowns(path +  "/HeadSpace2/HeadSpace/JSON Files/microwave-teddy.json", domain, textmaker);
        return Results.Ok(rows);
    }); 

app.MapGet("/dropdowns/4", async () =>
    {
        studyLogger.AppendTextToFile("----------Task 4----------");
        List<DropdownRow> rows = APISupport.GetInitialDropdowns(path +  "/HeadSpace2/HeadSpace/JSON Files/microwave-teddy.json", domain, textmaker);
        return Results.Ok(rows);
    }); 

app.MapGet("/dropdowns/5", async () =>
    {
        studyLogger.AppendTextToFile("----------Task 5----------");
        List<DropdownRow> rows = APISupport.GetInitialDropdowns(path +  "/HeadSpace2/HeadSpace/JSON Files/microwave-teddy.json", domain, textmaker);
        return Results.Ok(rows);
    }); 

app.MapGet("/dropdowns/6", async () =>
    {
        studyLogger.AppendTextToFile("----------Task 6----------");
        List<DropdownRow> rows = APISupport.GetInitialDropdowns(path +  "/HeadSpace2/HeadSpace/JSON Files/microwave-teddy.json", domain, textmaker);
        return Results.Ok(rows);
    });

app.MapGet("/dropdowns/7", async () =>
    {
        studyLogger.AppendTextToFile("----------Task 7----------");
        List<DropdownRow> rows = APISupport.GetInitialDropdowns(path +  "/HeadSpace2/HeadSpace/JSON Files/microwave-teddy.json", domain, textmaker);
        return Results.Ok(rows);
    });

app.MapGet("/dropdowns/8", async () =>
    {
        studyLogger.AppendTextToFile("----------Task 8----------");
        List<DropdownRow> rows = APISupport.GetInitialDropdowns(path +  "/HeadSpace2/HeadSpace/JSON Files/microwave-teddy.json", domain, textmaker);
        return Results.Ok(rows);
    });

app.MapGet("/dropdowns/9", async () =>
    {
        studyLogger.AppendTextToFile("----------Task 9----------");
        List<DropdownRow> rows = APISupport.GetInitialDropdowns(path +  "/HeadSpace2/HeadSpace/JSON Files/microwave-teddy.json", domain, textmaker);
        return Results.Ok(rows);
    });

app.MapGet("/dropdowns/10", async () =>
    {
        studyLogger.AppendTextToFile("----------Task 10----------");
        List<DropdownRow> rows = APISupport.GetInitialDropdowns(path +  "/HeadSpace2/HeadSpace/JSON Files/microwave-teddy.json", domain, textmaker);
        return Results.Ok(rows);
    });

app.MapGet("/dropdowns/11", async () =>
    {
        studyLogger.AppendTextToFile("----------Task 11----------");
        List<DropdownRow> rows = APISupport.GetInitialDropdowns(path +  "/HeadSpace2/HeadSpace/JSON Files/microwave-both.json", domain, textmaker);
        return Results.Ok(rows);
    });

app.MapPost("/dropdowns", async (DropdownItemRequest dItemRequest) =>
{
    studyLogger.AppendTextToFile("asked for next dropdown");
    List<DropdownItemResponse> responses = StaticDropdownItems.GetNextDropdownItem(dItemRequest, domain, textmaker);
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
app.UseCors("AllowAllOrigins");
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

