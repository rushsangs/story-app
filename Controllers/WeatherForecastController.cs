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
        if(this.planningProblem == null)
            initialize();
        Plan p = this.planningProblem.HeadSpaceXSolution();
        return p.steps.Select( x => x.Item1);
        // .ToArray();
    }

    // POST: api/DropdownItem
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<List<DropdownItemResponse>>> PostDropdownRow(DropdownItemRequest dropdownItemRequest)
    {
        if(planningProblem == null)
            initialize();
        StaticDropdownItems.Populate();

        List<DropdownItemResponse> response = new List<DropdownItemResponse>();
        if(dropdownItemRequest.Page.Equals("beginning"))
        {
            // could be worldstate or character beliefs or desires, check group
        }
        else if (dropdownItemRequest.Page.Equals("middle"))
        {
            // check the main dropdown
            if(dropdownItemRequest.Main_DropDown.Length > 0)
            {
                // populate with actions
                response = StaticDropdownItems.getItems(planningProblem.groundedoperators.Select(op => op.text));
            }
            else
            {
                return StaticDropdownItems.actionConstraintDropdowns;
            }
        }
        else if (dropdownItemRequest.Page.Equals("ending"))
        {
            // could be worldstate or character beliefs, check group
        }
        response.Add(new DropdownItemResponse());
        return CreatedAtAction("GetDropdownItem", response);
    }
}
