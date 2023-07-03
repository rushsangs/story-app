using Microsoft.AspNetCore.Mvc;
using NarrativePlanning;

namespace story_app.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<string> Get()
    {
        string path = Directory.GetCurrentDirectory();
        string file = "/HeadSpace2/Tests/TestData/domain2.json";
        NarrativePlanning.DomainBuilder.JSONDomainBuilder domain = new NarrativePlanning.DomainBuilder.JSONDomainBuilder(path + file);
        WorldState initial = domain.initial;
        WorldState goal = domain.goal;
        List<HardConstraint> constraints = domain.middle;
        List<Operator> actions = domain.operators;

        Tuple<WorldState, WorldState, List<Operator>> x = PAC.PAC_C(initial, goal, actions, constraints);

        Plan p = new PlanningProblem(x.Item1, x.Item2, x.Item3, domain.desires).HeadSpaceXSolution();
        return p.steps.Select( x => x.Item1);
        // .ToArray();
    }
}
