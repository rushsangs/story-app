

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


export const sampleDdArgs = ddargs([['True', 'False']]);
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
    dropdownRow("beginning", "world", ['at Teddy L'], [['True', 'False']]),
    dropdownRow("beginning", "world", ['at Teddy Q'], [['True', 'False']]),
    dropdownRow("ending", "world", ['at Teddy L'], [['True', 'False']]),
    dropdownRow("ending", "world", ['at Teddy Q'], [['True', 'False']]),
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

export function compress_addDropdown(dropdowns){
    let reduced_dropdowns = dropdowns.filter(d=> (
        !d.value.includes("at Teddy") &&
        !d.value.includes("at Poppy") &&
        !d.value.includes("contained-in") &&
        !d.value.includes("plugged") &&
        !d.value.includes("outlet-empty")
    )).map(x=>x.label);
    reduced_dropdowns.unshift('The outlet is powering ');
    reduced_dropdowns.unshift('The soup is in ');
    if(dropdowns.filter(d=> d.value.includes("at Poppy")).length>0)
        reduced_dropdowns.unshift("Poppy is in the ");
    reduced_dropdowns.unshift('Teddy is in the ');
    return dropdownItem(reduced_dropdowns);
}
// export function compress_dropdowns(dropdowns) {
//     let reduced_dropdowns = dropdowns.filter((d)=> (
//                 !d.main_Dropdown.includes("at Teddy") &&
//                 !d.main_Dropdown.includes("at Poppy") &&
//                 !d.main_Dropdown.includes("contained-in ") &&
//                 !d.main_Dropdown.includes("plugged") &&
//                 !d.main_Dropdown.includes("outlet-empty")
//                 ));
//     reduced_dropdowns.unshift(dropdownRow("beginning", "world", ['The outlet is powering '], [['the Microwave', 'the Toaster', 'nothing']]));
//     reduced_dropdowns.unshift(dropdownRow("beginning", "Teddy", ['The outlet is powering '], [['the Microwave', 'the Toaster', 'nothing']]));
//     reduced_dropdowns.unshift(dropdownRow("beginning", "world", ['The soup is in '], [['a Bowl', 'a Pot']]));
//     reduced_dropdowns.unshift(dropdownRow("beginning", "Teddy", ['The soup is in '], [['a Bowl', 'a Pot']]));
//     if(dropdowns.filter((d)=>d.main_Dropdown.includes("at Poppy")).length>0)
//     {
//         reduced_dropdowns.unshift(dropdownRow("beginning", "world", ['Poppy is in the '], [['Kitchen', 'TeddysRoom', 'PoppysRoom']]));
//         reduced_dropdowns.unshift(dropdownRow("beginning", "Teddy", ['Poppy is in the '], [['Kitchen', 'TeddysRoom', 'PoppysRoom']]));
//     }
//     reduced_dropdowns.unshift(dropdownRow("beginning", "world", ['Teddy is in the '], [['Kitchen', 'TeddysRoom', 'PoppysRoom']]));
//     reduced_dropdowns.unshift(dropdownRow("beginning", "Teddy", ['Teddy is in the '], [['Kitchen', 'TeddysRoom', 'PoppysRoom']]));
    
//     return reduced_dropdowns;        
// }

// export function expand_dropdownValues(dropdownValues){
//     // console.log(dropdownValues)
//     let expanded_dropdowns = {}
//     let i = 0;
//     for(let key in dropdownValues)
//     {
//         let row = dropdownValues[key]
//         //row: {page: str, group: str, values: list of str}
//         if(row.values.includes("The outlet is powering "))
//         {
//             //expand to plugged and outlet-empty
//             if(row.values.includes("the Microwave"))
//             {
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["plugged Microwave", "True"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["plugged Toaster", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["outlet-empty", "False"]};
//             }
//             else if(row.values.includes("the Toaster"))
//             {
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["plugged Microwave", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["plugged Toaster", "True"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["outlet-empty", "False"]};
//             }
//             else if(row.values.includes("nothing"))
//             {
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["plugged Microwave", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["plugged Toaster", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["outlet-empty", "True"]};
//             }             
//         }
//         else if(row.values.includes("The soup is in "))
//         {
//             //expand to contained-in
//             if(row.values.includes("a Bowl"))
//             {
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["contained-in Soup Bowl", "True"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["contained-in Soup Pot", "False"]};
//             }
//             if(row.values.includes("a Pot"))
//             {
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["contained-in Soup Bowl", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["contained-in Soup Pot", "True"]};
//             }
//         }
//         else if(row.values.includes("Poppy is in the "))
//         {
//             //expand to at Poppy
//             if(row.values.includes("Kitchen"))
//             {
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Poppy Kitchen", "True"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Poppy PoppysRoom", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Poppy TeddysRoom", "False"]};
//             }
//             else if(row.values.includes("TeddysRoom"))
//             {
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Poppy Kitchen", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Poppy PoppysRoom", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Poppy TeddysRoom", "True"]};
//             }
//             else if(row.values.includes("PoppysRoom"))
//             {
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Poppy Kitchen", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Poppy PoppysRoom", "True"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Poppy TeddysRoom", "False"]};
//             }
//         }
//         else if(row.values.includes("Teddy is in the "))
//         {
//             //expand to at Teddy
//             if(row.values.includes("Kitchen"))
//             {
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Teddy Kitchen", "True"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Teddy PoppysRoom", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Teddy TeddysRoom", "False"]};
//             }
//             else if(row.values.includes("TeddysRoom"))
//             {
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Teddy Kitchen", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Teddy PoppysRoom", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Teddy TeddysRoom", "True"]};
//             }
//             else if(row.values.includes("PoppysRoom"))
//             {
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Teddy Kitchen", "False"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Teddy PoppysRoom", "True"]};
//                 expanded_dropdowns[i++] = {page: row.page, group: row.group, values: ["at Teddy TeddysRoom", "False"]};
//             }
//         }
//         else
//         {
//             expanded_dropdowns[i++] = row;
//         }
//     }
//     return expanded_dropdowns;
// }

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

