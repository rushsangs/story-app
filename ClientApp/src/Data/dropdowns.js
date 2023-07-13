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
const dropdownRow = (md, args) => 
{
    return {
    'Row_Id': 123,
    'Page': 'beginning',
    'Group': 'world',
    'Main_Dropdown': JSON.stringify(dropdownItem(md)),
    'Arguments': JSON.stringify(ddargs(args))
    }
};

export const sampleInitialDropdowns = [
    dropdownRow(['at Teddy L'],[['true', 'false']]),
    dropdownRow(['at Teddy Q'],[['true', 'false']]),
    dropdownRow(['alive Teddy'],[['true', 'false']])
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
