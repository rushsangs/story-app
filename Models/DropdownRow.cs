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
    public string Arguments {get; set;}

    public static DropdownRow createRow(int id, string Page, string Group, string[] Main_DropDown, string[] Arguments)
    {
        var r = new DropdownRow();
        r.RowId = id;
        r.Page = Page;
        r.Group = Group;
        var md = new List<DropdownItemResponse>();
        foreach (string item in Main_DropDown)
        {
            md.Add(new DropdownItemResponse(item));
        }
        r.Main_Dropdown = JsonConvert.SerializeObject(md);
        var args = new List<DropdownItemResponse>();
        foreach (string item in Arguments)
        {
            args.Add(new DropdownItemResponse(item));
        }
        var args_dl = new List<List<DropdownItemResponse>>();
        args_dl.Add(args);
        r.Arguments = JsonConvert.SerializeObject(args_dl);
        return r;
    }
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

        tflistItem.Add(new DropdownItemResponse("Yes"));
        tflistItem.Add(new DropdownItemResponse("No"));
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
            bListItem.Add(new DropdownItemResponse("Yes"));
            bListItem.Add(new DropdownItemResponse("No"));
            // bListItem.Add(new DropdownItemResponse("unknown"));
            bDropDownItem.Add(bListItem);
            foreach(string lit in literals)
            {
                //only update beliefs about the outlet being plugged in for characters.
                if(!lit.Contains("plugged") && !lit.Contains("outlet-empty"))
                    continue;
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
        CopyWorldStateToBeliefs(domain.initial);
        AddDropdownsToBeliefs(domain.initial, beginnings);
        // AddDropdownsToDesires(domain, allrows.FindAll((row) => row.Page.Equals("beginning") && row.Group.Equals("desires")));
        
        //for ending dropdowns, reset the domain goals first
        domain.goal.empty();
        List<DropdownRow> endings = allrows.FindAll((row) => row.Page.Equals("ending"));
        AddDropdownsToWorldState(domain.goal, endings);
        AddDropdownsToBeliefs(domain.goal, endings);

        AddDropdownsToMiddle(domain, allrows.FindAll((row) => row.Page.Equals("actions")));
    }

    private static void AddDropdownsToBeliefs(WorldState worldstate, List<DropdownRow> rows)
    {
        // if the dropdowns have any options for the character beliefs add them here
        foreach(DropdownRow row in rows.Where((r)=> !r.Group.Equals("world")))
        {
            Character? c = worldstate.characters.Where((c)=>c.name.Equals(row.Group)).FirstOrDefault();
            if(c==null)
            {
                c = new Character();
                c.name = row.Group;
                worldstate.characters.Add(c);
            }
            string lit = JsonConvert.DeserializeObject<List<DropdownItemResponse>>(row.Main_Dropdown).First().value;
            string arg = JsonConvert.DeserializeObject<List<List<DropdownItemResponse>>>(row.Arguments).First().Select((a)=> a.value).First();
            if(arg.Equals("bPlus") || arg.Equals("Yes"))
            {
                c.bPlus.TryAdd(lit, 1);
                c.bMinus.Remove(lit);
                c.unsure.Remove(lit);
            }
            if(arg.Equals("bMinus") || arg.Equals("No"))
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

    private static void CopyWorldStateToBeliefs(WorldState worldstate)
    {
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
        }
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
            if(arg.Equals("Yes"))
            {
                string lit = JsonConvert.DeserializeObject<List<DropdownItemResponse>>(row.Main_Dropdown).First().value;
                worldstate.tWorld.TryAdd(lit, 1);
                worldstate.fWorld.Remove(lit);
            }
            else if(arg.Equals("No"))
            {
                string lit = JsonConvert.DeserializeObject<List<DropdownItemResponse>>(row.Main_Dropdown).First().value;
                worldstate.fWorld.TryAdd(lit, 1);
                worldstate.tWorld.Remove(lit);
            }
        }
    }
    public static List<DropdownRow> CompressDropdowns(List<DropdownRow> dropdowns)
    {
        List<DropdownRow> reducedDropdowns = dropdowns
            .Where(d => !d.Main_Dropdown.Contains("at Teddy") &&
                        !d.Main_Dropdown.Contains("at Poppy") &&
                        !d.Main_Dropdown.Contains("contained-in") &&
                        !d.Main_Dropdown.Contains("plugged") &&
                        !d.Main_Dropdown.Contains("eaten") &&
                        !d.Main_Dropdown.Contains("outlet-empty")) 
            .ToList();
        
        
        reducedDropdowns.Add(DropdownRow.createRow(reducedDropdowns.Count, "beginning", "world", 
                        new string[]{"The outlet is powering "},
                        new string[]{"the Microwave", "the Toaster", "nothing"} ));

        if (dropdowns.Any(d=> d.Main_Dropdown.Contains("contained-in")))
        {
            reducedDropdowns.Add(DropdownRow.createRow(reducedDropdowns.Count,"beginning", "world", 
                        new string[]{"The soup is in "},
                        new string[]{"a Bowl", "a Pot"} ));
        }

        if (dropdowns.Any(d=> d.Main_Dropdown.Contains("eaten Soup")))
        {
            reducedDropdowns.Add(DropdownRow.createRow(reducedDropdowns.Count,"beginning", "world", 
                        new string[]{"The Soup has been eaten by "},
                        new string[]{"nobody", "Teddy"} ));
        }
        
        if (dropdowns.Any(d=> d.Main_Dropdown.Contains("eaten Bread")))
        {
            reducedDropdowns.Add(DropdownRow.createRow(reducedDropdowns.Count,"beginning", "world", 
                        new string[]{"The Bread has been eaten by "},
                        new string[]{"nobody", "Poppy" } ));
        }
        // reducedDropdowns.Add(DropdownRow.createRow(reducedDropdowns.Count,"beginning", "Teddy", 
        //                 new string[]{"The soup is in "},
        //                 new string[]{"a Bowl", "a Pot"} ));
        
        
        if (dropdowns.Any(d => d.Main_Dropdown.Contains("at Poppy")))
        {
            // Poppy exists in this problem.
            reducedDropdowns.Add(DropdownRow.createRow(reducedDropdowns.Count,"beginning", "world", 
                        new string[]{"Poppy is in the "},
                        new string[]{"Kitchen", "LivingRoom"} ));

            reducedDropdowns.Add(DropdownRow.createRow(reducedDropdowns.Count, "beginning", "Poppy", 
                        new string[]{"The outlet is powering "},
                        new string[]{"the Microwave", "the Toaster", "nothing"} ));

            // reducedDropdowns.Add(DropdownRow.createRow(reducedDropdowns.Count,"beginning", "Teddy", 
            //             new string[]{"Poppy is in the "},
            //             new string[]{"Kitchen", "LivingRoom"} ));
        }

        if (dropdowns.Any(d => d.Main_Dropdown.Contains("at Teddy")))
        {
            reducedDropdowns.Add(DropdownRow.createRow(reducedDropdowns.Count,"beginning", "world", 
                        new string[]{"Teddy is in the "},
                        new string[]{"Kitchen", "LivingRoom"} ));
            
            reducedDropdowns.Add(DropdownRow.createRow(reducedDropdowns.Count, "beginning", "Teddy", 
                        new string[]{"The outlet is powering "},
                        new string[]{"the Microwave", "the Toaster", "nothing"} ));
        }
        

        // reducedDropdowns.Add(DropdownRow.createRow(reducedDropdowns.Count,"beginning", "Teddy", 
        //                 new string[]{"Teddy is in the "},
        //                 new string[]{"Kitchen", "LivingRoom"} ));
        
        return reducedDropdowns;
    }

    public static List<DropdownRow> ExpandDropdowns(List<DropdownRow> dropdowns)
    {
        List<DropdownRow> expandedDropdowns = new List<DropdownRow>();
        int i = 0;

        foreach (var dropdownRow in dropdowns)
        {
            if (dropdownRow.Main_Dropdown.Contains("The outlet is powering "))
            {
                //expand to plugged and outlet-empty
                if (dropdownRow.Arguments.Contains("the Microwave"))
                {
                    expandedDropdowns.Add(DropdownRow.createRow(i++, dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"plugged Microwave"},
                        new string[]{"Yes"} ));
                    
                    expandedDropdowns.Add(DropdownRow.createRow(i++, dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"plugged Toaster"},
                        new string[]{"No"} ));
                    
                    expandedDropdowns.Add(DropdownRow.createRow(i++, dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"outlet-empty"},
                        new string[]{"No"} ));
                }
                else if (dropdownRow.Arguments.Contains("the Toaster"))
                {
                    expandedDropdowns.Add(DropdownRow.createRow(i++, dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"plugged Microwave"},
                        new string[]{"No"} ));
                    
                    expandedDropdowns.Add(DropdownRow.createRow(i++, dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"plugged Toaster"},
                        new string[]{"Yes"} ));
                    
                    expandedDropdowns.Add(DropdownRow.createRow(i++, dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"outlet-empty"},
                        new string[]{"No"} ));
                }
                else if (dropdownRow.Arguments.Contains("nothing"))
                {
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"plugged Microwave"},
                        new string[]{"No"} ));
                    
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"plugged Toaster"},
                        new string[]{"No"} ));
                    
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"outlet-empty"},
                        new string[]{"Yes"} ));
                }
            }
            else if (dropdownRow.Main_Dropdown.Contains("The soup is in "))
            {
                //expand to contained-in
                if (dropdownRow.Arguments.Contains("a Bowl"))
                {
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"contained-in Soup Bowl"},
                        new string[]{"Yes"} ));
                    
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"contained-in Soup Pot"},
                        new string[]{"No"} ));
                }
                if (dropdownRow.Arguments.Contains("a Pot"))
                {
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"contained-in Soup Bowl"},
                        new string[]{"No"} ));
                    
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"contained-in Soup Pot"},
                        new string[]{"Yes"} ));
                }
            }
            else if (dropdownRow.Main_Dropdown.Contains("Poppy is in the "))
            {
                //expand to at Poppy
                if (dropdownRow.Arguments.Contains("Kitchen"))
                {
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"at Poppy Kitchen"},
                        new string[]{"Yes"} ));
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"at Poppy LivingRoom"},
                        new string[]{"No"} ));
                }
                else if (dropdownRow.Arguments.Contains("LivingRoom"))
                {
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"at Poppy Kitchen"},
                        new string[]{"No"} ));
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"at Poppy LivingRoom"},
                        new string[]{"Yes"} ));
                    
                }
            }
            else if (dropdownRow.Main_Dropdown.Contains("Teddy is in the "))
            {
                //expand to at Teddy
                if (dropdownRow.Arguments.Contains("Kitchen"))
                {
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"at Teddy Kitchen"},
                        new string[]{"Yes"} ));
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"at Teddy LivingRoom"},
                        new string[]{"No"} ));
                }
                else if (dropdownRow.Arguments.Contains("LivingRoom"))
                {
                     expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"at Teddy Kitchen"},
                        new string[]{"No"} ));
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"at Teddy LivingRoom"},
                        new string[]{"Yes"} ));
                }
            }
            else if (dropdownRow.Main_Dropdown.Contains("The Bread has been eaten by "))
            {
                //expand to eaten Bread
                 if (dropdownRow.Arguments.Contains("Teddy"))
                 {
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"eaten Bread Teddy"},
                        new string[]{"Yes"} ));
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"eaten Bread Poppy"},
                        new string[]{"No"} ));
                 }
                 else if (dropdownRow.Arguments.Contains("Poppy"))
                 {
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"eaten Bread Teddy"},
                        new string[]{"No"} ));
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"eaten Bread Poppy"},
                        new string[]{"Yes"} ));
                 }
                 else if (dropdownRow.Arguments.Contains("nobody"))
                 {
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"eaten Bread Teddy"},
                        new string[]{"No"} ));
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"eaten Bread Poppy"},
                        new string[]{"No"} ));
                 }
            }
            else if (dropdownRow.Main_Dropdown.Contains("The Soup has been eaten by "))
            {
                //expand to eaten Bread
                 if (dropdownRow.Arguments.Contains("Teddy"))
                 {
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"eaten Soup Teddy"},
                        new string[]{"Yes"} ));
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"eaten Soup Poppy"},
                        new string[]{"No"} ));
                 }
                 else if (dropdownRow.Arguments.Contains("Poppy"))
                 {
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"eaten Soup Teddy"},
                        new string[]{"No"} ));
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"eaten Soup Poppy"},
                        new string[]{"Yes"} ));
                 }
                 else if (dropdownRow.Arguments.Contains("nobody"))
                 {
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"eaten Soup Teddy"},
                        new string[]{"No"} ));
                    expandedDropdowns.Add(DropdownRow.createRow(i++,dropdownRow.Page, dropdownRow.Group, 
                        new string[]{"eaten Soup Poppy"},
                        new string[]{"No"} ));
                 }
            }
            else
            {
                expandedDropdowns.Add(dropdownRow);
            }
        }
        return expandedDropdowns;
    }
}