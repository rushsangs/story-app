using System.ComponentModel.DataAnnotations;

namespace story_app.Models;

public class DropdownItemRequest
{
    public string Page {get; set;}
    public string Group {get; set;}
    public string Main_DropDown {get; set;}
    public string Arguments {get; set;} // arguments are separated with semicolon
}

public class DropdownItemResponse
{
    public string label {get; set;}
    public string value {get; set;}
    public string Tooltip {get; set;}
    public string Color  {get; set;}

    public DropdownItemResponse(string text)
    {
        this.label = text;
        this.value = text;
        this.Tooltip = "Select one:";
        this.Color = "";
    }

    public DropdownItemResponse(): this("") {}
}

public class StaticDropdownItems
{
    public static List<DropdownItemResponse> actionConstraintDropdowns = new List<DropdownItemResponse>();
    public static void Populate()
    {
        DropdownItemResponse r = new DropdownItemResponse();
        r.label = "Sometime";
        r.Tooltip = "The specified action should occur at some point in the story.";
        r.Color = "";
        actionConstraintDropdowns.Add(r);
        r = new DropdownItemResponse();
        r.label = "Sometime after";
        r.Tooltip = "The specified first action should occur before the specified second action in the story.";
        r.Color = "";
        actionConstraintDropdowns.Add(r);
    }

    public static List<DropdownItemResponse> getItems(IEnumerable<string> args)
    {
        List<DropdownItemResponse> responses = new List<DropdownItemResponse>();
        foreach(string arg in args)
        {
            DropdownItemResponse r = new DropdownItemResponse();
            r.label = arg;
            r.Tooltip = "";
            if(arg.Contains("fail"))
                r.Color = "red";
            responses.Add(r);
        }
        return responses;
    }

    public static List<DropdownItemResponse> GetNextDropdownItem(DropdownItemRequest dropdownItemRequest, NarrativePlanning.DomainBuilder.JSONDomainBuilder domain)
    {
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
                response = StaticDropdownItems.getItems(domain.operators.Select(op => op.text));
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
        // response.Add(new DropdownItemResponse());
        return response;
    }
}