using System.ComponentModel.DataAnnotations;
using NarrativePlanning;
using NarrativePlanning.DomainBuilder;
using Newtonsoft.Json;

namespace story_app.Models;

public class DropdownRow
{
    [Key]
    public long RowId { get; set; }
    public string Page {get; set;}
    public string Group {get; set;}
    public string Main_DropDown {get; set;}
    public string Arguments {get; set;} // arguments are separated with semicolon
}

public class DropdownRowSupport
{

    
    public static List<DropdownRow> CreateStartupDropdowns(JSONDomainBuilder domain)
    {
        List<DropdownRow> allrows = new List<DropdownRow>();
        // create dropdowns for initial world state
        CreateBeginningDropdowns(domain, ref allrows);
        CreateEndingDropdowns(domain, ref allrows);
        return allrows;
    }

    private static void CreateEndingDropdowns(JSONDomainBuilder domain, ref List<DropdownRow> allrows)
    {
        CombineLiteralsIntoDropdownRows(domain.goal, ref allrows, "ending", "");
    }

    private static void CreateBeginningDropdowns(JSONDomainBuilder domain, ref List<DropdownRow> allrows)
    {
        CombineLiteralsIntoDropdownRows(domain.initial, ref allrows, "beginning", "");
        ConvertDesiresToDropdownRows(domain.desires, ref allrows, "beginning");
    }

    // Desire dropdowns will be
    // Desire description as main dropdown
    // second dropdown as Include, Don't Include
    private static void ConvertDesiresToDropdownRows(List<Desire> desires, ref List<DropdownRow> allrows, string page)
    {
        var includeDropdownItem = new List<DropdownItemResponse>();
        includeDropdownItem.Add(new DropdownItemResponse("Include"));
        includeDropdownItem.Add(new DropdownItemResponse("Do Not Include"));
        foreach(Desire desire in desires)
        {
            DropdownRow newRow = new DropdownRow();
            newRow.RowId = allrows.Count;
            newRow.Page = page;
            newRow.Group = "desires";
            var d = new DropdownItemResponse(desire.ToString());
            d.Tooltip = JsonConvert.SerializeObject(desire);
            newRow.Main_DropDown = JsonConvert.SerializeObject(d);
            // lit_parts.RemoveAt(0);
            newRow.Arguments = JsonConvert.SerializeObject(includeDropdownItem);
            allrows.Add(newRow);
        }
    }

    private static void CombineLiteralsIntoDropdownRows(NarrativePlanning.WorldState state, ref  List<DropdownRow> allrows, string page, string group)
    {
        // gather all literals
        HashSet<string> literals = new HashSet<string>();
        foreach(string lit in state.tWorld.Keys)
            literals.Add(lit);
        foreach(string lit in state.fWorld.Keys)
            literals.Add(lit);    
        
        var tfDropdownItem = new List<DropdownItemResponse>();
        tfDropdownItem.Add(new DropdownItemResponse("True"));
        tfDropdownItem.Add(new DropdownItemResponse("False"));
        // add each literal 
        foreach(string lit in literals)
        {
            DropdownRow newRow = new DropdownRow();
            newRow.RowId = allrows.Count;
            newRow.Page = page;
            newRow.Group = "world";
            // List<string> lit_parts = new List<string>(lit.Split(" "));
            newRow.Main_DropDown = JsonConvert.SerializeObject(new DropdownItemResponse(lit));
            // lit_parts.RemoveAt(0);
            newRow.Arguments = JsonConvert.SerializeObject(tfDropdownItem);
            allrows.Add(newRow);
        }
        foreach(Character c in state.characters)
        {
            var bDropDownItem = new List<DropdownItemResponse>();
            bDropDownItem.Add(new DropdownItemResponse("bPlus"));
            bDropDownItem.Add(new DropdownItemResponse("bMinus"));
            bDropDownItem.Add(new DropdownItemResponse("unknown"));
            foreach(string lit in literals)
            {
                DropdownRow newRow = new DropdownRow();
                newRow.RowId = allrows.Count;
                newRow.Page = page;
                newRow.Group = c.name;
                newRow.Main_DropDown = JsonConvert.SerializeObject(new DropdownItemResponse(lit));
                newRow.Arguments = JsonConvert.SerializeObject(bDropDownItem);
                allrows.Add(newRow);
            }
        }
    }

    public static void parseDropdownsIntoDomain(List<DropdownRow> allrows, JSONDomainBuilder domain)
    {
        //parse all beginning dropdowns
        List<DropdownRow> beginnings = allrows.FindAll((row) => row.Page.Equals("beginning") && !row.Group.Equals("desires"));
        AddDropdownsToWorldState(domain.initial, beginnings);
        AddDropdownsToDesires(domain, allrows.FindAll((row) => row.Page.Equals("beginning") && row.Group.Equals("desires")));
        AddDropdownsToWorldState(domain.goal, allrows.FindAll((row) => row.Page.Equals("ending")) );
    }

    private static void AddDropdownsToDesires(JSONDomainBuilder domain, List<DropdownRow> dropdownRows)
    {
        domain.desires.Clear();
        foreach(DropdownRow row in dropdownRows)
        {
            bool include = JsonConvert.DeserializeObject<List<DropdownItemResponse>>(row.Arguments).Select((a)=> a.Text).First().Equals("Include");
            if(include)
            {
                Desire desire = JsonConvert.DeserializeObject<Desire>(JsonConvert.DeserializeObject<DropdownItemResponse>(row.Main_DropDown).Tooltip);
                domain.desires.Add(desire);
            }
        }
    }

    private static void AddDropdownsToWorldState(WorldState worldstate, List<DropdownRow> rows)
    {
        foreach(DropdownRow row in rows.FindAll((r)=> r.Group.Equals("world")))
        {
            string arg = JsonConvert.DeserializeObject<List<DropdownItemResponse>>(row.Arguments).Select((a)=> a.Text).First();
            if(arg.Equals("True"))
            {
                string lit = JsonConvert.DeserializeObject<DropdownItemResponse>(row.Main_DropDown).Text;
                worldstate.tWorld.TryAdd(lit, 1);
                worldstate.fWorld.Remove(lit);
            }
            else if(arg.Equals("False"))
            {
                string lit = JsonConvert.DeserializeObject<DropdownItemResponse>(row.Main_DropDown).Text;
                worldstate.fWorld.TryAdd(lit, 1);
                worldstate.tWorld.Remove(lit);
            }
        }
        // copy characters' bplus and bminus as the worldstate by default
        foreach(Character c in worldstate.characters)
        {
            foreach(string lit in worldstate.tWorld.Keys)
            {
                c.bPlus.TryAdd(lit, 1);
                c.bMinus.Remove(lit);
                c.unsure.Remove(lit);
            }
            foreach(string lit in worldstate.fWorld.Keys)
            {
                c.bMinus.TryAdd(lit, 1);
                c.bPlus.Remove(lit);
                c.unsure.Remove(lit);
            }
            // if the dropdowns have any options for the character beliefs add them here
            foreach(DropdownRow row in rows.FindAll((r)=> r.Group.Equals(c.name)))
            {
                string lit = JsonConvert.DeserializeObject<DropdownItemResponse>(row.Main_DropDown).Text;
                string arg = JsonConvert.DeserializeObject<List<DropdownItemResponse>>(row.Arguments).Select((a)=> a.Text).First();
                if(arg.Equals("bPlus"))
                {
                    c.bPlus.TryAdd(lit, 1);
                    c.bMinus.Remove(lit);
                    c.unsure.Remove(lit);
                }
                if(arg.Equals("bMinus"))
                {
                    c.bMinus.TryAdd(lit, 1);
                    c.bPlus.Remove(lit);
                    c.unsure.Remove(lit);
                }
                if(arg.Equals("unknown"))
                {
                    c.unsure.TryAdd(lit, 1);
                    c.bMinus.Remove(lit);
                    c.bPlus.Remove(lit);
                }
            }
        }
    }
}