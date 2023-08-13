using System.ComponentModel.DataAnnotations;
using HeadSpace.TextMaker;
using Newtonsoft.Json;

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
    public string tooltip {get; set;}
    public string color  {get; set;}

    public DropdownItemResponse(string value, string label, string tooltip)
    {
        this.label = label;
        this.value = value;
        this.tooltip = tooltip;
        this.color = "";
    }

    public DropdownItemResponse(string value, string label): this(value, label, "Select one:") {}

    public DropdownItemResponse(string value): this(value, value) {}

    public DropdownItemResponse(): this("") {}

    public static List<DropdownItemResponse> compressDropdownItems(List<DropdownItemResponse> dropdownItems)
    {
        List<DropdownItemResponse> reducedDropdowns = dropdownItems
            .Where(d => !d.value.Contains("at Teddy") &&
                        !d.value.Contains("at Poppy") &&
                        !d.value.Contains("contained-in") &&
                        !d.value.Contains("plugged") &&
                        !d.value.Contains("outlet-empty")).ToList();
        reducedDropdowns.Insert(0, new DropdownItemResponse("The outlet is powering "));
        reducedDropdowns.Insert(0, new DropdownItemResponse("The soup is in "));
        if (dropdownItems.Any(d => d.value.Contains("at Poppy")))
            reducedDropdowns.Insert(0, new DropdownItemResponse("Poppy is in the "));
        reducedDropdowns.Insert(0, new DropdownItemResponse("Teddy is in the "));
        return reducedDropdowns;
    }
}

public class StaticDropdownItems
{
    public static List<DropdownItemResponse> actionConstraintDropdowns = new List<DropdownItemResponse>();
    public static List<DropdownItemResponse> tfDropdowns = new List<DropdownItemResponse>();
    public static List<DropdownItemResponse> beliefDropdowns = new List<DropdownItemResponse>();
    public static List<DropdownItemResponse> emptyDropdowns = new List<DropdownItemResponse>();
    public static void Populate()
    {
        DropdownItemResponse r = new DropdownItemResponse( "At some point");
        r.tooltip = "The specified action should occur at some point in the story.";
        r.color = "";
        actionConstraintDropdowns.Add(r);
        r = new DropdownItemResponse("Sometime after");
        r.tooltip = "The specified first action should occur before the specified second action in the story.";
        r.color = "";
        actionConstraintDropdowns.Add(r);
        r = new DropdownItemResponse("True");
        r.tooltip = "Select one:";
        r.color = "";
        tfDropdowns.Add(r);
        r = new DropdownItemResponse("False");
        r.tooltip = "Select one:";
        r.color = "";
        tfDropdowns.Add(r);
        r = new DropdownItemResponse("bPlus");
        r.tooltip = "Select one:";
        r.color = "";
        beliefDropdowns.Add(r);
        r = new DropdownItemResponse("bMinus");
        r.tooltip = "Select one:";
        r.color = "";
        beliefDropdowns.Add(r);
        r = new DropdownItemResponse("unsure");
        r.tooltip = "Select one:";
        r.color = "";
        beliefDropdowns.Add(r);
    }

    public static List<DropdownItemResponse> getItems(IEnumerable<string> args)
    {
        List<DropdownItemResponse> responses = new List<DropdownItemResponse>();
        foreach(string arg in args)
        {
            DropdownItemResponse r = new DropdownItemResponse(arg);
            r.tooltip = "";
            if(arg.Contains("fail"))
                r.color = "red";
            responses.Add(r);
        }
        return responses;
    }

    public static List<DropdownItemResponse> getItems(IEnumerable<Tuple<string, string>> tuples_label_value)
    {
        List<DropdownItemResponse> responses = new List<DropdownItemResponse>();
        foreach(Tuple<string, string> arg in tuples_label_value)
        {
            DropdownItemResponse r = new DropdownItemResponse(arg.Item2, arg.Item1, arg.Item2 );
            if(arg.Item2.Contains("fail"))
                r.color = "red";
            responses.Add(r);
        }
        return responses;
    }

    public static List<DropdownItemResponse> GetNextDropdownItem(DropdownItemRequest dropdownItemRequest, NarrativePlanning.DomainBuilder.JSONDomainBuilder domain, TextMaker textMaker)
    {
        List<DropdownItemResponse> response = new List<DropdownItemResponse>();
        if(dropdownItemRequest.Page.Equals("beginning") || dropdownItemRequest.Page.Equals("ending"))
        {
            if(dropdownItemRequest.Main_DropDown.Length==0)
            {
                //need to send main dropdowns as all possible literals
                HashSet<string> literals = new HashSet<string>(domain.initial.tWorld.Keys);
                literals.UnionWith(domain.initial.fWorld.Keys);
                response = StaticDropdownItems.getItems(literals.Select(lit => new Tuple<string, string>(textMaker.getString(lit), lit)));
                response = DropdownItemResponse.compressDropdownItems(response);
                return response;
            }
            if(dropdownItemRequest.Group.Equals("world"))
            {
                if(dropdownItemRequest.Arguments.Length==0 ||
                    JsonConvert.DeserializeObject<List<DropdownItemResponse>>(dropdownItemRequest.Arguments).Count == 0)
                {
                    if(getContextualDropdownItems(dropdownItemRequest)!=null)
                        return getContextualDropdownItems(dropdownItemRequest);
                    return StaticDropdownItems.tfDropdowns;
                } 
                else
                    return emptyDropdowns;
            }
            else
            {
                // belief-based dropdowns
                if(dropdownItemRequest.Arguments.Length==0 ||
                    JsonConvert.DeserializeObject<List<DropdownItemResponse>>(dropdownItemRequest.Arguments).Count == 0)
                {
                    if(getContextualDropdownItems(dropdownItemRequest)!=null)
                        return getContextualDropdownItems(dropdownItemRequest);
                    return StaticDropdownItems.beliefDropdowns;
                }
                else if(JsonConvert.DeserializeObject<List<DropdownItemResponse>>(dropdownItemRequest.Arguments).Count == 0)
                    return StaticDropdownItems.beliefDropdowns;
                else
                    return emptyDropdowns;
            }
        }
        else if (dropdownItemRequest.Page.Equals("actions"))
        {
            // check the main dropdown
            if(dropdownItemRequest.Main_DropDown.Length > 0)
            {
                // populate with actions, filtering to only Poppy's or Teddy's actions if needed
                if(domain.initial.characters.Where(c=>c.name.Equals("Poppy")).First().bMinus.Count==0)
                    response = StaticDropdownItems.getItems(domain.operators.Where(op => op.character.Equals("Teddy")).Select(op => new Tuple<string, string>(textMaker.getString(op.text), op.text)));
                else if(domain.initial.characters.Where(c=>c.name.Equals("Teddy")).First().bMinus.Count==0)
                    response = StaticDropdownItems.getItems(domain.operators.Where(op => op.character.Equals("Poppy")).Select(op => new Tuple<string, string>(textMaker.getString(op.text), op.text)));
                else
                    response = StaticDropdownItems.getItems(domain.operators.Select(op => new Tuple<string, string>(textMaker.getString(op.text), op.text)));
            }
            else
            {
                return StaticDropdownItems.actionConstraintDropdowns;
            }
        }
        // else if (dropdownItemRequest.Page.Equals("ending"))
        // {
        //     // could be worldstate or character beliefs, check group
        // }
        // response.Add(new DropdownItemResponse());
        return response;
    }

    private static List<DropdownItemResponse>? getContextualDropdownItems(DropdownItemRequest dropdownItemRequest)
    {
        if(dropdownItemRequest.Main_DropDown.Contains("The outlet is powering "))
            return StaticDropdownItems.getItems(new string[]{"the Microwave", "the Toaster", "nothing"});
        else if(dropdownItemRequest.Main_DropDown.Contains("The soup is in "))
            return StaticDropdownItems.getItems(new string[]{"a Pot", "a Bowl"});
        else if(dropdownItemRequest.Main_DropDown.Contains("Teddy is in the "))
            return StaticDropdownItems.getItems(new string[]{"Kitchen", "TeddysRoom", "PoppysRoom"});
        else if(dropdownItemRequest.Main_DropDown.Contains("Poppy is in the "))
            return StaticDropdownItems.getItems(new string[]{"Kitchen", "TeddysRoom", "PoppysRoom"});
        else
            return null;
    }
}