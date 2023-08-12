using story_app.Models;

class APISupport
{
    public static List<DropdownRow> GetInitialDropdowns(string pathWithFile, NarrativePlanning.DomainBuilder.JSONDomainBuilder domain, HeadSpace.TextMaker.TextMaker textmaker)
    {
        NarrativePlanning.DomainBuilder.JSONDomainBuilder domain2 = new NarrativePlanning.DomainBuilder.JSONDomainBuilder(pathWithFile);
        domain.desires = domain2.desires;
        domain.initial = domain2.initial;
        domain.goal = domain2.goal;
        List<DropdownRow> rows = DropdownRowSupport.CreateStartupDropdowns(domain, textmaker);
        rows = DropdownRowSupport.CompressDropdowns(rows);
        return rows;
}
}