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
}