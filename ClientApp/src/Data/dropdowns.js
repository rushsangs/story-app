const dropdownItem = (md) => {
    return md.map( mdItem => {
    return {
    'name': mdItem,
    'tooltip': 'Select one:',
    'color': '',
    'label': mdItem,
    'value': mdItem
        };
    });
};

export const ddargs = (args) =>
{
    return args.map(element_list => {
        return element_list.map( element =>
            {
                return {
                    'name': element,
                    'label': element,
                    'value': element,
                    'tooltip': 'Select one:',
                    'color': ''
                }
            }

        )
        
    });   
}


export const sampleDdArgs = ddargs([['true', 'false']]);
const dropdownRow = (page, md, args) => 
{
    return {
    'Row_Id': 123,
    'Page': page,
    'Group': 'world',
    'Main_Dropdown': JSON.stringify(dropdownItem(md)),
    'Arguments': JSON.stringify(ddargs(args))
    }
};

export const sampleInitialDropdowns = [
    dropdownRow("beginning", ['at Teddy L'], [['true', 'false']]),
    dropdownRow("beginning", ['at Teddy Q'], [['true', 'false']]),
    dropdownRow("ending", ['at Teddy L'], [['true', 'false']]),
    dropdownRow("ending", ['at Teddy Q'], [['true', 'false']]),
];

// export const sampleActionDropdowns = [
//     dropdownRow()
// ];

export const sometimesAction = [
    {
        'key': 'dropdown1',
        'value': [
            {
                'label': 'Dolores picks up gun',
                'value': 'Dolores picks up gun',
                'color': ''
            },{
                'label': 'Dolores walks down the street',
                'value': 'Dolores walks down the street',
            },{
                'label': 'Dolores shoots',
                'value': 'Dolores shoots',
            },{
                'label': 'Dolores loads with bullet',
                'value': 'Dolores loads with bullet',
            },{
                'label': 'Dolores escapes',
                'value': 'Dolores escapes',
            }
        ]
    },
    {
        'key': 'dropdown2',
        'value': [
            {
                'label': 'Dolores picks up gun',
                'value': 'Dolores picks up gun',
            },{
                'label': 'Dolores walks down the street',
                'value': 'Dolores walks down the street',
            },{
                'label': 'Dolores shoots',
                'value': 'Dolores shoots',
            }
        ]
    },
]
export function shape_into_dropdownrequestitems(js_values){
    const result = [];
    // js_values = js_values.filter((v) => Object.keys(v.values).length > 0);
    for(let i in js_values)
    {
        let element  = js_values[i];
        for(const key in element.values)
        {
            result.push({
                Page: element.page,
                Group: element.group,
                SelectedContent: element.values[key]
            });
        }
    }
    return result;
}