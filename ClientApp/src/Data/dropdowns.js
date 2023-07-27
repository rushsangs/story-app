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
                    'label': element,
                    'value': element,
                    'tooltip': element,
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

export const IntentDropdowns = ddargs([[
    'Default Intent',
    'Persistent Intent',
    'Flexible Intent',
    'Drop Intent'
]]);

export const mockInitialDropdowns =[
    {
        "rowId": 0,
        "page": "beginning",
        "group": "world",
        "main_Dropdown": "[{\"label\":\"at Teddy L\",\"value\":\"at Teddy L\",\"tooltip\":\"Select one:\",\"color\":\"\"}]",
        "arguments": "[[{\"label\":\"True\",\"value\":\"True\",\"tooltip\":\"Select one:\",\"color\":\"\"},{\"label\":\"False\",\"value\":\"False\",\"tooltip\":\"Select one:\",\"color\":\"\"}]]"
    },
    {
        "rowId": 1,
        "page": "beginning",
        "group": "Teddy",
        "main_Dropdown": "[{\"label\":\"at Teddy L\",\"value\":\"at Teddy L\",\"tooltip\":\"Select one:\",\"color\":\"\"}]",
        "arguments": "[[{\"label\":\"bPlus\",\"value\":\"bPlus\",\"tooltip\":\"Select one:\",\"color\":\"\"},{\"label\":\"bMinus\",\"value\":\"bMinus\",\"tooltip\":\"Select one:\",\"color\":\"\"},{\"label\":\"unknown\",\"value\":\"unknown\",\"tooltip\":\"Select one:\",\"color\":\"\"}]]"
    },
    {
        "rowId": 3,
        "page": "ending",
        "group": "world",
        "main_Dropdown": "[{\"label\":\"at Teddy L\",\"value\":\"at Teddy L\",\"tooltip\":\"Select one:\",\"color\":\"\"}]",
        "arguments": "[[{\"label\":\"True\",\"value\":\"True\",\"tooltip\":\"Select one:\",\"color\":\"\"},{\"label\":\"False\",\"value\":\"False\",\"tooltip\":\"Select one:\",\"color\":\"\"}]]"
    },
    {
        "rowId": 4,
        "page": "ending",
        "group": "Teddy",
        "main_Dropdown": "[{\"label\":\"at Teddy L\",\"value\":\"at Teddy L\",\"tooltip\":\"Select one:\",\"color\":\"\"}]",
        "arguments": "[[{\"label\":\"bPlus\",\"value\":\"bPlus\",\"tooltip\":\"Select one:\",\"color\":\"\"},{\"label\":\"bMinus\",\"value\":\"bMinus\",\"tooltip\":\"Select one:\",\"color\":\"\"},{\"label\":\"unknown\",\"value\":\"unknown\",\"tooltip\":\"Select one:\",\"color\":\"\"}]]"
    }
]

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
        let main_dropdown = [{
            label: element.values[0],
            value: element.values[0],
            tooltip: '',
            color: ''
        }];
        let args = element.values.slice(1);
        args = args.map((arg) => {
            return [{
                value: arg,
                label: arg,
                tooltip: '',
                color: ''
            }];
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

export function shape_into_dropdownrequestitem(js_values, page, group){
    let md_val = js_values.current[0];
    var md = {
        label: md_val,
        value: md_val,
        tooltip: "",
        color: ""
    };
    let args = js_values.current.slice(1).map((x) => {
        return {
            label: x,
            value: x,
            tooltip: "",
            color: ""
        };
    });
    var requestData = {
        Page: page,
        Group: group, 
        Main_DropDown: JSON.stringify(md),
        Arguments: JSON.stringify(args)
    }
    return requestData
}