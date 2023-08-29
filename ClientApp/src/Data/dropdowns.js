

const dropdownItem = (md) => {
    return md.map( element => {
    return {
        'label': element,
        'value': element,
        'tooltip': element,
        'color': ''
        };
    });
};

export const ddargs = (args) =>
{
    return args.map(element_list => {
        return dropdownItem(element_list);    
    });   
}


export const sampleDdArgs = ddargs([['Yes', 'No']]);
const dropdownRow = (page, group, md, args) => 
{
    return {
    'rowId': 123,
    'page': page,
    'group': group,
    'main_Dropdown': JSON.stringify(dropdownItem(md)),
    'arguments': JSON.stringify(ddargs(args))
    }
};

export const sampleInitialDropdowns = [
    dropdownRow("beginning", "world", ['at Teddy L'], [['Yes', 'No']]),
    dropdownRow("beginning", "world", ['at Teddy Q'], [['Yes', 'No']]),
    dropdownRow("ending", "world", ['at Teddy L'], [['Yes', 'No']]),
    dropdownRow("ending", "world", ['at Teddy Q'], [['Yes', 'No']]),
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
        "arguments": "[[{\"label\":\"Yes\",\"value\":\"Yes\",\"tooltip\":\"Select one:\",\"color\":\"\"},{\"label\":\"No\",\"value\":\"No\",\"tooltip\":\"Select one:\",\"color\":\"\"}]]"
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
        "arguments": "[[{\"label\":\"Yes\",\"value\":\"Yes\",\"tooltip\":\"Select one:\",\"color\":\"\"},{\"label\":\"No\",\"value\":\"No\",\"tooltip\":\"Select one:\",\"color\":\"\"}]]"
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

// function remove_combined_and_add_expanded_dropdowns(dropdown)
// {
//     let result = [];
//     if(dropdown.main_dropdown.includes("The outlet is powering"))
//     {
//         //get selected value
//         let selected= JSON.parse(dropdown.arguments
//         result.push("")
//     }
// }

