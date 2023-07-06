using Microsoft.AspNetCore.Mvc;
using NarrativePlanning;
using story_app.Models;

namespace story_app.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };


    private PlanningProblem planningProblem;
    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    private void initialize()
    {
        string path = Directory.GetCurrentDirectory();
        string file = "/HeadSpace2/Tests/TestData/domain2.json";
        NarrativePlanning.DomainBuilder.JSONDomainBuilder domain = new NarrativePlanning.DomainBuilder.JSONDomainBuilder(path + file);
        WorldState initial = domain.initial;
        WorldState goal = domain.goal;
        List<HardConstraint> constraints = domain.middle;
        List<Operator> actions = domain.operators;

        Tuple<WorldState, WorldState, List<Operator>> x = PAC.PAC_C(initial, goal, actions, constraints);
        this.planningProblem = new PlanningProblem(x.Item1, x.Item2, x.Item3, domain.desires);
    }

    [HttpGet]
    public IEnumerable<string> Get()
    {
        // String r = "ff";
        // // List<string> r  =new List<string>();
        // // r.Add("ff");
        // return r;
        if(this.planningProblem == null)
            initialize();
        Plan p = this.planningProblem.HeadSpaceXSolution();
        return p.steps.Select( x => x.Item1).ToArray();
        // .ToArray();
    }
    // public IEnumerable<WeatherForecast> Get()
    // {
    //     return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    //     {
    //         Date = DateTime.Now.AddDays(index),
    //         TemperatureC = Random.Shared.Next(-20, 55),
    //         Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    //     })
    //     .ToArray();
    // }
    
    // // POST: weatherforecast
    // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // [HttpPost]
    // public async Task<ActionResult<List<DropdownItemResponse>>> PostDropdownRow(DropdownItemRequest dropdownItemRequest)
    // {
    //     if(planningProblem == null)
    //         initialize();
    //     StaticDropdownItems.Populate();

        
}
