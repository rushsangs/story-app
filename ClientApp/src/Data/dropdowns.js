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


export const sampleDdArgs = ddargs([['True', 'False']]);
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
    dropdownRow("beginning", ['at Teddy L'], [['True', 'False']]),
    dropdownRow("beginning", ['at Teddy Q'], [['True', 'False']]),
    dropdownRow("ending", ['at Teddy L'], [['True', 'False']]),
    dropdownRow("ending", ['at Teddy Q'], [['True', 'False']]),
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
        let main_dropdown = {
            Text: element.values[0],
            Tooltip: '',
            Color: ''
        };
        let args = element.values.slice(1);
        args = args.map((arg) => {
            return {
                Text: arg,
                Tooltip: '',
                Color: ''
            };
        })
        result.push({
                rowId: 123,
                page: element.page,
                group: element.group,
                main_Dropdown: JSON.stringify(main_dropdown),
                arguments: JSON.stringify(args)
        }); 
    }
    return result;
}