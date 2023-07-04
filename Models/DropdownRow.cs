using System.ComponentModel.DataAnnotations;

namespace story_app.Models;

public class DropdownRow
{
    public long Id { get; set; }
    public string Page {get; set;}
    public string Group {get; set;}
    public string Main_DropDown {get; set;}
    public string Arguments {get; set;} // arguments are separated with semicolon
}