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
    public string Text {get; set;}
    public string Tooltip {get; set;}
    public string Color  {get; set;}

    public DropdownItemResponse(string text)
    {
        this.Text = text;
        this.Tooltip = "";
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
        r.Text = "Sometime";
        r.Tooltip = "The specified action should occur at some point in the story.";
        r.Color = "";
        actionConstraintDropdowns.Add(r);
        r = new DropdownItemResponse();
        r.Text = "Sometime after";
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
            r.Text = arg;
            r.Tooltip = "";
            if(arg.Contains("fail"))
                r.Color = "red";
            actionConstraintDropdowns.Add(r);
        }
        return responses;
    }
}