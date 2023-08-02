using System.ComponentModel.DataAnnotations;
using HeadSpace.TextMaker;
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
    public string Main_Dropdown {get; set;}
    public string Arguments {get; set;} // arguments are separated with semicolon
}

public class DropdownRowSupport
{
    // public static List<DropdownRow> CreateStartupDropdowns(JSONDomainBuilder domain)
    // {
    //     List<DropdownRow> allrows = new List<DropdownRow>();
    //     // create dropdowns for initial world state
    //     CreateBeginningDropdowns(domain, ref allrows);
    //     CreateEndingDropdowns(domain, ref allrows);
    //     return allrows;
    // }
    public static List<DropdownRow> CreateStartupDropdowns(JSONDomainBuilder domain, TextMaker textMaker)
    {
        List<DropdownRow> allrows = new List<DropdownRow>();
        // create dropdowns for initial world state
        CreateBeginningDropdowns(domain, ref allrows, textMaker);
        CreateEndingDropdowns(domain, ref allrows, textMaker);
        return allrows;
    }

    private static void CreateEndingDropdowns(JSONDomainBuilder domain, ref List<DropdownRow> allrows,TextMaker textMaker)
    {
        CombineLiteralsIntoDropdownRows(domain.goal, ref allrows, "ending", "",textMaker);
    }

    private static void CreateBeginningDropdowns(JSONDomainBuilder domain, ref List<DropdownRow> allrows,TextMaker textMaker)
    {
        CombineLiteralsIntoDropdownRows(domain.initial, ref allrows, "beginning", "", textMaker);
        // ConvertDesiresToDropdownRows(domain.desires, ref allrows, "beginning");
    }

    // Desire dropdowns will be
    // Desire description as main dropdown
    // second dropdown as Include, Don't Include
    private static void ConvertDesiresToDropdownRows(List<Desire> desires, ref List<DropdownRow> allrows, string page)
    {
        var includeDropdownItem = new List<List<DropdownItemResponse>>();
        var includelistItem = new List<DropdownItemResponse>();
        includelistItem.Add(new DropdownItemResponse("Include"));
        includelistItem.Add(new DropdownItemResponse("Do Not Include"));
        includeDropdownItem.Add(includelistItem);
        foreach(Desire desire in desires)
        {
            DropdownRow newRow = new DropdownRow();
            newRow.RowId = allrows.Count;
            newRow.Page = page;
            newRow.Group = "desires";
            var d = new DropdownItemResponse(desire.ToString());
            d.tooltip = JsonConvert.SerializeObject(desire);
            newRow.Main_Dropdown = JsonConvert.SerializeObject(d);
            // lit_parts.RemoveAt(0);
            newRow.Arguments = JsonConvert.SerializeObject(includeDropdownItem);
            allrows.Add(newRow);
        }
    }

    private static void CombineLiteralsIntoDropdownRows(NarrativePlanning.WorldState state, ref  List<DropdownRow> allrows, string page, string group, TextMaker textMaker)
    {
        // gather all literals
        HashSet<string> literals = new HashSet<string>();
        foreach(string lit in state.tWorld.Keys)
            literals.Add(lit);
        foreach(string lit in state.fWorld.Keys)
            literals.Add(lit);    
        
        var tfDropdownItem = new List<List<DropdownItemResponse>>();
        var tflistItem = new List<DropdownItemResponse>();

        tflistItem.Add(new DropdownItemResponse("True"));
        tflistItem.Add(new DropdownItemResponse("False"));
        tfDropdownItem.Add(tflistItem);
        // add each literal 
        foreach(string lit in literals)
        {
            DropdownRow newRow = new DropdownRow();
            newRow.RowId = allrows.Count;
            newRow.Page = page;
            newRow.Group = "world";
            // List<string> lit_parts = new List<string>(lit.Split(" "));
            var md = new List<DropdownItemResponse>();
            md.Add(new DropdownItemResponse(lit, textMaker.getString(lit)));
            newRow.Main_Dropdown = JsonConvert.SerializeObject(md);
            // lit_parts.RemoveAt(0);
            newRow.Arguments = JsonConvert.SerializeObject(tfDropdownItem);
            allrows.Add(newRow);
        }
        foreach(Character c in state.characters)
        {
            var bDropDownItem = new List<List<DropdownItemResponse>>();
            var bListItem = new List<DropdownItemResponse>();
            bListItem.Add(new DropdownItemResponse("True"));
            bListItem.Add(new DropdownItemResponse("False"));
            // bListItem.Add(new DropdownItemResponse("unknown"));
            bDropDownItem.Add(bListItem);
            foreach(string lit in literals)
            {
                DropdownRow newRow = new DropdownRow();
                newRow.RowId = allrows.Count;
                newRow.Page = page;
                newRow.Group = c.name;
                var md = new List<DropdownItemResponse>();
                md.Add(new DropdownItemResponse(lit, textMaker.getString(lit)));
                newRow.Main_Dropdown = JsonConvert.SerializeObject(md);
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
        // AddDropdownsToDesires(domain, allrows.FindAll((row) => row.Page.Equals("beginning") && row.Group.Equals("desires")));
        AddDropdownsToWorldState(domain.goal, allrows.FindAll((row) => row.Page.Equals("ending")) );
        AddDropdownsToMiddle(domain, allrows.FindAll((row) => row.Page.Equals("actions")));
    }

    private static void AddDropdownsToMiddle(JSONDomainBuilder domain, List<DropdownRow> dropdownRows)
    {
        domain.middle.Clear();
        foreach(DropdownRow row in dropdownRows)
        {
            string constraint = (JsonConvert.DeserializeObject<List<DropdownItemResponse>>(row.Main_Dropdown).First().value);
            List<List<DropdownItemResponse>> args = (JsonConvert.DeserializeObject<List<List<DropdownItemResponse>>>(row.Arguments));
            HardConstraint c = null;
            if (constraint.Equals("At some point"))
            {
                String actionliteral = args.First().First().value;
                List<string> intents = new List<string>();
                bool failed = false;
                if(args.Last().First().value.Contains("Intent"))
                {
                    // intent constraint present
                    string intent = args.Last().First().value;
                    string intent_mode = (intent.Contains("Flexible"))?IntentionConstraints.SUB:(intent.Contains("Drop"))?IntentionConstraints.DROP:IntentionConstraints.PERSIST;
                    intents.Add(intent_mode);
                }
                if(actionliteral.Contains("fail"))
                    failed = true;
                DataStructures.ActionLiteral al = new DataStructures.ActionLiteral(actionliteral, false, failed, intents);
                c = new Sometime(al);
            }
            else if (constraint.Equals("Sometime after"))
            {
                String actionliteral1 = args.First().First().value;
                String actionliteral2 = args[1].First().value;
                List<string> intents = new List<string>();
                bool failed1 = false;
                bool failed2 = false;
                if(args.Last().First().value.Contains("Intent"))
                {
                    // intent constraint present
                    string intent = args.Last().First().value;
                    string intent_mode = (intent.Contains("Flexible"))?IntentionConstraints.SUB:(intent.Contains("Drop"))?IntentionConstraints.DROP:IntentionConstraints.PERSIST;
                    intents.Add(intent_mode);
                }
                if(actionliteral1.Contains("fail"))
                    failed1 = true;
                if(actionliteral2.Contains("fail"))
                    failed2 = true;
                DataStructures.ActionLiteral al1 = new DataStructures.ActionLiteral(actionliteral1, false, failed1, intents);
                DataStructures.ActionLiteral al2 = new DataStructures.ActionLiteral(actionliteral2, false, failed2, intents);
                c = new SometimeAfter(al1, al2);
            }
            domain.middle.Add(c);
        }
    }

    //obsolete
    // private static void AddDropdownsToDesires(JSONDomainBuilder domain, List<DropdownRow> dropdownRows)
    // {
    //     domain.desires.Clear();
    //     foreach(DropdownRow row in dropdownRows)
    //     {
    //         bool include = JsonConvert.DeserializeObject<List<DropdownItemResponse>>(row.Arguments).Select((a)=> a.label).First().Equals("Include");
    //         if(include)
    //         {
    //             Desire desire = JsonConvert.DeserializeObject<Desire>(JsonConvert.DeserializeObject<DropdownItemResponse>(row.Main_Dropdown).tooltip);
    //             domain.desires.Add(desire);
    //         }
    //     }
    // }

    private static void AddDropdownsToWorldState(WorldState worldstate, List<DropdownRow> rows)
    {
        foreach(DropdownRow row in rows.FindAll((r)=> r.Group.Equals("world")))
        {
            string arg = JsonConvert.DeserializeObject<List<List<DropdownItemResponse>>>(row.Arguments).First().Select((a)=> a.value).First();
            if(arg.Equals("True"))
            {
                string lit = JsonConvert.DeserializeObject<List<DropdownItemResponse>>(row.Main_Dropdown).First().value;
                worldstate.tWorld.TryAdd(lit, 1);
                worldstate.fWorld.Remove(lit);
            }
            else if(arg.Equals("False"))
            {
                string lit = JsonConvert.DeserializeObject<List<DropdownItemResponse>>(row.Main_Dropdown).First().value;
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
                string lit = JsonConvert.DeserializeObject<List<DropdownItemResponse>>(row.Main_Dropdown).First().value;
                string arg = JsonConvert.DeserializeObject<List<List<DropdownItemResponse>>>(row.Arguments).First().Select((a)=> a.value).First();
                if(arg.Equals("bPlus") || arg.Equals("True"))
                {
                    c.bPlus.TryAdd(lit, 1);
                    c.bMinus.Remove(lit);
                    c.unsure.Remove(lit);
                }
                if(arg.Equals("bMinus") || arg.Equals("False"))
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