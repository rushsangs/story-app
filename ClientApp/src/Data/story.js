export default [
    "Dolores picks up a gun",
    "Dolores picks up a bullet",
    "Dolores loads bullet in gun",
    "Dolores shoots at door",
    "Dolores escapes the jail",
    "Dolores picks up a bullet",
    "Dolores loads bullet in gun",
    "Dolores shoots at door",
    "Dolores escapes the jail",
    "Dolores picks up a bullet",
    "Dolores loads bullet in gun",
    "Dolores shoots at door",
    "Dolores escapes the jail",
    "Dolores loads bullet in gun",
    "Dolores shoots at door",
    "Dolores escapes the jail"
]

export const task1 = [
    {key: 0, text: "Teddy starts in Teddy's Room.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y){
                console.log(y[k]);
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('Teddy is in the ') && y[k].values.includes("TeddysRoom"))
                    return true;
            }
        return false;
    })},
    {key: 1, text: "Soup is not heated up initially.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y){
                console.log(y[k]);
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('heated Soup') && y[k].values.includes("False"))
                    return true;
            }
        return false;
    })},
    {key: 2, text: "Teddy heats up the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats")).length > 0)},
    {key: 3, text: "Teddy eats the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

export const task2 = [
    {key: 0, text: "Poppy starts in Poppy's Room.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y){
                console.log(y[k]);
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('Poppy is in the ') && y[k].values.includes("PoppysRoom"))
                    return true;
            }
        return false;
    })},

    {key: 1, text: "Bread is not heated up initially.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y){
                console.log(y[k]);
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('heated Bread') && y[k].values.includes("False"))
                    return true;
            }
        return false;
    })},
    {key: 2, text: "Poppy heats up the Bread.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Poppy uses")).length > 0)},
    {key: 3, text: "Poppy eats the Bread.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Poppy eats the Bread")).length > 0)},
]
export const task3 = [
    {key: 0, text: "The power outlet is not powering the Microwave.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y){
                // console.log(y[k]);
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('The outlet is powering ') && !y[k].values.includes("the Microwave"))
                    return true;
            }
        return false;
    })},
    {key: 0, text: "Teddy believes the Microwave is powered.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='beginning'&&y[k].group==="Teddy"&& y[k].values.includes('The outlet is powering ') && y[k].values.includes("the Microwave"))
                    return true;
        return false;
    })},
    {key: 1, text: "Soup is not heated up initially.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y){
                // console.log(y[k]);
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('heated Soup') && y[k].values.includes("False"))
                    return true;
            }
        return false;
    })},
    {key: 2, text: "Teddy heats up the soup without using the microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats the Soup over the stove.")).length > 0)},
    {key: 3, text: "Teddy eats the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

  export const task4 = [
    {key: 0, text: "The power outlet is powering the Microwave.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y){
                // console.log(y[k]);
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('The outlet is powering ') && y[k].values.includes("the Microwave"))
                    return true;
            }
        return false;
    })},
    {key: 1, text: "Teddy believes the Microwave is not powered.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='beginning'&&y[k].group==="Teddy"&& y[k].values.includes('The outlet is powering ') && !y[k].values.includes("the Microwave"))
                    return true;
        return false;
    })},
    {key: 2, text: "Teddy heats up the soup without using the microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats the Soup over the stove.")).length > 0)},
    {key: 3, text: "Teddy eats the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

  export const task5 = [
    {key: 0, text: "The outlet is not powering the Microwave.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('The outlet is powering ') && !y[k].values.includes("the Microwave"))
                    return true;
        return false;
    })},
    {key: 1, text: "Teddy believes the Microwave is plugged in.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='beginning'&&y[k].group==="Teddy"&& y[k].values.includes('The outlet is powering ') && y[k].values.includes("the Microwave"))
                    return true;
        return false;
    })},
    {key: 2, text: "Teddy attempts and fails to heat the Soup using the Microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy tries to start the microwave to heat up ")).length > 0)},
    {key: 3, text: "Teddy still eats the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

  export const task6 = [
    {key: 0, text: "Teddy attempts and fails to heat the Soup using the Microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy tries to start the microwave to heat up ")).length > 0)},
    {key: 2, text: "Teddy heats up the soup using the microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats up the Soup in the microwave.")).length > 0)},
    {key: 3, text: "Teddy eats the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

  export const task7 = [
    {key: 0, text: "Teddy attempts and fails to heat the Soup using the Microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy tries to start the microwave to heat up ")).length > 0)},
    {key: 1, text: "The soup has not been eaten in the end of the story.", status: 0, test:((x,y)=> x!== undefined && x.count > 0 && x.filter( step => step.includes("Teddy eats the Soup")).length === 0)}
  ];

  export const task8 = [
    {key: 0, text: "Teddy attempts and fails to heat the Soup using the Microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy tries to start the microwave to heat up ")).length > 0)},
    {key: 2, text: "Teddy heats up the soup using the stove.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats the Soup over the stove.")).length > 0)},
    {key: 3, text: "Teddy eats the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

  export const task9 = [
    {key: 0, text: "Teddy attempts and fails to heat the Soup using the Microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy tries to start the microwave to heat up ")).length > 0)},
    {key: 1, text: "An action constraint specifies that Teddy attempts and fails to use the Microwave.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='actions'&& y[k].values.includes("heatWithMicrowave-false Soup Bowl Teddy"))
                    return true;
        return false;
    })},
  ];

  export const task10 = [
    {key: 1, text: "An action constraint specifies that Teddy attempts and fails to use the Microwave.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
            if(y[k].page==='actions'&& y[k].values.includes("heatWithMicrowave-false Soup Bowl Teddy"))
                    return true;
        return false;
    })},
    {key: 1, text: "An action constraint also has an intent specified.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='actions'&& (y[k].values.includes("Persistent Intent") || y[k].values.includes("Flexible Intent") || y[k].values.includes("Default Intent") || y[k].values.includes("Drop Intent")))
                    return true;
        return false;
    })},
  ];

  export const task11 = [
    {key: 0, text: "Soup is not heated up initially.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('heated Soup') && y[k].values.includes("False"))
                    return true;
        return false;
    })},
    {key: 1, text: "Bread is not heated up initially.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('heated Bread') && y[k].values.includes("False"))
                    return true;
        return false;
    })},
    {key: 2, text: "Poppy heats up the Bread.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Poppy uses")).length > 0)},
    {key: 3, text: "Teddy attempts and fails to heat the Soup using the Microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy tries to start the microwave to heat up ")).length > 0)},
    {key: 4, text: "Teddy finally eats the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];


export const taskData = [
    {
        taskNumber: 1,
        taskInfo: "Stories have a beginning and ending. Find a story where Teddy starts in TeddysRoom, goes to the Kitchen, heats up the soup, and eats the soup.",
        tasks: task1
    },
    {
        taskNumber: 2,
        taskInfo: "Different characters have different desires. While Teddy will always have soup, Poppy will always have bread. Bread needs to be cooked using the Toaster. Find a story where Poppy starts in PoppysRoom, goes to the Kitchem, cooks the Bread and then eats it.",
        tasks: task2
    },
    {
        taskNumber: 3,
        taskInfo: "Now back to Teddy. The world can be manipulated to have characters take different plans. Try changing only the world so Teddy does not use the Microwave to heat up the soup.",
        tasks: task3
    },
    {
        taskNumber: 4,
        taskInfo: "Teddy's beliefs can be manipulated so he takes different plans. Try changing Teddy's belief that the microwave is not plugged in, to create a different story.",
        tasks: task4
    },
    {
        taskNumber: 5,
        taskInfo: "Characters can sometimes fail when they attempt an action with incorrect beliefs. If Teddy believes the Microwave is plugged in but it isn't plugged in, he will fail. Try creating a story where he fails.",
        tasks: task5
    },
    {
        taskNumber: 6,
        taskInfo: "Upon failing, characters can choose an alternate plan, or repair the initial plan. Try creating a story where Teddy fails to use the Microwave initially, but then sticks to using the Microwave to heat up the Soup.",
        tasks: task6
    },
    {
        taskNumber: 7,
        taskInfo: "By changing the goals, you can explore different endings of a story when a character fails. For example, create a story where Teddy ends up not eating the Soup.",
        tasks: task7
    },
    {
        taskNumber: 8,
        taskInfo: "Using action constraints in the Actions tab, you can directly specify what actions you'd like to see in the story. Use an action constraint to specifically ask the system to find stories where Teddy uses the stovetop after failing to use the microwave.",
        tasks: task8
    },
    {
        taskNumber: 9,
        taskInfo: "You can also specify failed actions in action constraints. Create (any) story where Teddy fails to use the microwave by specifying the failed attempt to use the microwave.",
        tasks: task9
    },
    {
        taskNumber: 10,
        taskInfo: "In an action constraint, you can also specify how you want the character to behave when they fail an action. Characters can either perist with their initial plan, substitute it, or drop their goal entirely. Specify an intent constraint with an action constraint by clicking on the settings icon.",
        tasks: task10
    },
    {
        taskNumber: 11,
        taskInfo: "Use all you have learnt to create a story with both Poppy and Teddy achieving their goals, and Teddy failing to use the Microwave at some point.",
        tasks: task11
    }
]

export const tasks = [
    {
        label: "Task 1",
        value: 1
    },
    {
        label: "Task 2",
        value: 2
    },
    {
        label: "Task 3",
        value: 3
    },
    {
        label: "Task 4",
        value: 4
    },
    {
        label: "Task 5",
        value: 5
    },
    {
        label: "Task 6",
        value: 6
    },
    {
        label: "Task 7",
        value: 7
    },
    {
        label: "Task 8",
        value: 8
    },
    {
        label: "Task 9",
        value: 9
    },
    {
        label: "Task 10",
        value: 10
    },
    {
        label: "Task 11",
        value: 11
    }
]