
let task4NoChangesChecker = (x,y)=> {
    //hard check for beginning and ending and action constraints
    // y
    let a=[...Array(8).keys()].map((x)=>false), b=true, c=true;
    if(y!== undefined)
        for (let k in y)
        {
            //beginning constraints
            if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('heated Soup') && y[k].values.includes("False"))
                a[0]=true;
            if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('infridge Soup') && y[k].values.includes("True"))
                a[1]=true;
            if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('The outlet is powering ') && y[k].values.includes("the Microwave") )
                a[2]=true;
            if(y[k].page==='beginning'&&y[k].group==="Teddy"&& y[k].values.includes('The outlet is powering ') && y[k].values.includes("the Microwave") )
                a[3]=true;
            if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('The soup is in ') && y[k].values.includes("a Bowl") )
                a[4] = true;
            if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('The Soup has been eaten by ') && y[k].values.includes("nobody") )
                a[5]=true;
            if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('Teddy is in the ') && y[k].values.includes("Kitchen") )
                a[6]=true;
            // ending constraints
            if(y[k].page==='ending'&&y[k].group==="world"&& y[k].values.includes('The Soup has been eaten by ') && y[k].values.includes("Teddy") )
                a[7]=true;
            // no other ending constraints
            if(y[k].page==='ending'&&y[k].group==="world"&& !y[k].values.includes('The Soup has been eaten by '))
                b=false;
            // no middle constraints
            if(y[k].page==='actions')
                c= false;
        }
    console.log(a, b, c);
    if(a.filter(x=>x===false).length>0)
        return false;
    return b && c;
}

export const task1 = [
    {key: 0, text: "Teddy starts in the Living Room.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y){
                // console.log(y[k]);
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('Teddy is in the ') && y[k].values.includes("LivingRoom"))
                    return true;
            }
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
    {key: 2, text: "Teddy heats up the soup in the created story.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats")).length > 0)},
    {key: 3, text: "Teddy eats the soup in the created story.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

export const task2 = [
    {key: 0, text: "Poppy starts in the Living Room.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y){
                // console.log(y[k]);
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('Poppy is in the ') && y[k].values.includes("LivingRoom"))
                    return true;
            }
        return false;
    })},

    {key: 1, text: "Bread is not heated up initially.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y){
                // console.log(y[k]);
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('heated Bread') && y[k].values.includes("False"))
                    return true;
            }
        return false;
    })},
    {key: 2, text: "Poppy heats up the Bread in the created story.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Poppy uses")).length > 0)},
    {key: 3, text: "Poppy eats the Bread in the created story.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Poppy eats the Bread")).length > 0)},
]

  export const task3 = [
    {key: 0, text: "In the beginning, the power outlet is powering the Microwave.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y){
                // console.log(y[k]);
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('The outlet is powering ') && y[k].values.includes("the Microwave"))
                    return true;
            }
        return false;
    })},
    {key: 1, text: "In the beginning, Teddy believes the Toaster is powered.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='beginning'&&y[k].group==="Teddy"&& y[k].values.includes('The outlet is powering ') && !y[k].values.includes("the Microwave"))
                    return true;
        return false;
    })},
    {key: 2, text: "Teddy heats up the soup without using the microwave in the created story.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats the Soup over the stove.")).length > 0)},
    
  ];

  export const task4 = [
    {key:4, text: "Beginning Tab: Soup has been cooked is set to False.", status: 0, test:((x,y)=> {
        if(y!== undefined)
        for (let k in y){
            // console.log(y[k]);
            if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('heated Soup') && y[k].values.includes("False"))
                return true;
        }
        return false;
    })},
    {key:5, text: "Ending Tab: The Soup has been eaten by Teddy.", status: 0, test:((x,y)=> {
        if(y!== undefined)
        for (let k in y){
            // console.log(y[k]);
            if(y[k].page==='ending'&&y[k].group==="world"&& y[k].values.includes('The Soup has been eaten by ') && y[k].values.includes("Teddy"))
                return true;
        }
        return false;
    })},
    {key:6, text: "No other changes made in the Beginning/Ending tabs.", status: 0, test: task4NoChangesChecker},
    {key: 0, text: "Teddy disconnects the Microwave in the story.", status: 0, test:((x,y)=> x!==undefined && x.filter( step => step.includes("Teddy disconnects")).length > 0)},
    {key: 2, text: "Teddy heats up the soup without using the microwave in the story.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats the Soup over the stove.")).length > 0)},
    {key: 3, text: "Teddy eats the soup in the story.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

  export const task5 = [
    {key: 0, text: "In the beginning, the outlet is not powering the Microwave.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('The outlet is powering ') && !y[k].values.includes("the Microwave"))
                    return true;
        return false;
    })},
    {key: 1, text: "In the beginning, Teddy believes the Microwave is plugged in.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='beginning'&&y[k].group==="Teddy"&& y[k].values.includes('The outlet is powering ') && y[k].values.includes("the Microwave"))
                    return true;
        return false;
    })},
    {key: 2, text: "In the story, Teddy (initially) attempts and fails to heat the Soup using the Microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy tries to start the microwave to heat up ")).length > 0)},
    {key: 3, text: "Teddy eventually heats up the soup in the story.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats")).length > 0)},
    {key: 4, text: "Teddy still eats the soup in the story.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

  export const task6 = [
    {key: 0, text: "In the story, Teddy (initially) attempts and fails to heat the Soup using the Microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy tries to start the microwave to heat up ")).length > 0)},
    {key: 2, text: "Create a story where Teddy heats up the soup over the stove.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats the Soup over the stove.")).length > 0), sticky: false},
    {key: 3, text: "Create a story where Teddy heats up the soup using the microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats up the Soup in the microwave.")).length > 0), sticky: false}
  ];

  export const task7 = [
    {key: 0, text: "In the story, Teddy attempts and fails to heat the Soup using the Microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy tries to start the microwave to heat up ")).length > 0)},
    {key: 1, text: "The soup has not been eaten in the end of the story.", status: 0, test:((x,y)=> {
        return x!==undefined && x.length > 0 && x.filter(step => step.includes("Teddy eats the Soup")).length===0;
    })}
  ];

  export const task8 = [
    {key: 1, text: "Soup is not heated up initially.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y){
                // console.log(y[k]);
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('heated Soup') && y[k].values.includes("False"))
                    return true;
            }
        return false;
    })},
    {key: 2, text: "An action constraint specifies that Teddy heats up the soup using the stove.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='actions'&& y[k].values.includes("heatWithStove Soup Pot Teddy"))
                    return true;
        return false;
    })},
    {key: 3, text: "Teddy eats the soup in the story.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
    
  ];

  export const task9 = [
    {key: 0, text: "In the story, Teddy attempts and fails to heat the Soup using the Microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy tries to start the microwave to heat up ")).length > 0)},
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
    {key: 0, text: "Everyone <b>correctly</b> believes the Microwave is powered initially.", status: 0, test:((x,y)=> {
        let a=false, b=false, c=false;
        if(y!== undefined)
            for (let k in y)
            {
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('The outlet is powering ') && y[k].values.includes("the Microwave") )
                    a=true;
                if(y[k].page==='beginning'&&y[k].group==="Teddy"&& y[k].values.includes('The outlet is powering ') && y[k].values.includes("the Microwave") )
                    b=true;
                if(y[k].page==='beginning'&&y[k].group==="Poppy"&& y[k].values.includes('The outlet is powering ') && y[k].values.includes("the Microwave") )
                    c=true;
            }
        return a && b && c;
    })},
    {key: 1, text: "Both Soup and Bread are not heated up initially.", status: 0, test:((x,y)=> {
        let a=false, b=false
        if(y!== undefined)
            for (let k in y)
            {
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('heated Soup') && y[k].values.includes("False"))
                    a= true;
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('heated Bread') && y[k].values.includes("False"))
                    b= true;
            }
        return a && b;
    })},
    {key: 2, text: "Teddy is <b>not</b> in the Kitchen in the beginning of the story.", status: 0, test:((x,y)=> {
        if(y!== undefined)
            for (let k in y)
                if(y[k].page==='beginning'&&y[k].group==="world"&& y[k].values.includes('Teddy is in the ') && y[k].values.includes("LivingRoom"))
                    return true;
        return false;
    })},
    {key: 3, text: "Poppy eats the Bread in the story.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Poppy eats the Bread")).length > 0)},
    {key: 4, text: "In the story, Teddy (initially) attempts and fails to heat the Soup using the Microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy tries to start the microwave to heat up ")).length > 0)},
    {key: 5, text: "Teddy finally eats the soup in the story.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];


export const taskData = [
    {
        taskNumber: 1,
        taskInfo: "Stories have a beginning and ending. Find a story where Teddy starts in LivingRoom, goes to the Kitchen, heats up the soup, and eats the soup.",
        taskTips: [],
        tasks: task1
    },
    {
        taskNumber: 2,
        taskInfo: "Different characters have different desires. While Teddy will always have soup, Poppy will always have bread. Bread needs to be cooked using the Toaster. Find a story where Poppy starts in the LivingRoom, goes to the Kitchem, cooks the Bread and then eats it.",
        taskTips: [],
        tasks: task2
    },
    {
        taskNumber: 3,
        taskInfo: "Now back to Teddy. Teddy's beliefs can be manipulated so he takes different plans. Try changing Teddy's belief about the power outlet to create a different story.",
        taskTips: [],
        tasks: task3
    },
    {
        taskNumber: 4,
        taskInfo: "<b> For this task, do not change details in the Beginning/Ending tabs except the ones specified.</b>  Keep generating different stories until you find one where Teddy disconnects the Microwave and uses the stove to heat the soup.",
        taskTips: ["You can click the Create Story button again to create other stories with the same beginning and ending."],
        tasks: task4
    },
    {
        taskNumber: 5,
        taskInfo: "Characters can sometimes fail when they attempt an action with incorrect beliefs. If Teddy believes the Microwave is plugged in but it isn't plugged in, he will fail. Try creating a story where he fails.",
        taskTips: ["To fail an action, the character must have incorrect belief related to the action!"],
        tasks: task5
    },
    {
        taskNumber: 6,
        taskInfo: "Upon failing, characters can choose an alternate plan, or repair the initial plan. Try creating a story where Teddy fails to use the Microwave initially, and explore different stories. ",
        taskTips: ["Remember, you can click on Create Story multiple times to find other stories."],
        tasks: task6
    },
    {
        taskNumber: 7,
        taskInfo: "By changing the goals, you can explore different endings of a story when a character fails. For example, create a story where Teddy ends up not eating the Soup.",
        taskTips: ["You can also add beliefs as goals in the Ending tab."],
        tasks: task7
    },
    {
        taskNumber: 8,
        taskInfo: "Using action constraints in the Actions tab, you can directly specify what actions you'd like to see in the story. Try using action constraints to specifically guide Teddy to use the stovetop to heat up the Soup.",
        taskTips: ["Action constraints help you specify what actions you would like to see in the story."],
        tasks: task8
    },
    {
        taskNumber: 9,
        taskInfo: "You can also specify failed actions in action constraints. Create (any) story where Teddy fails to use the microwave by specifying the failed attempt to use the microwave.",
        taskTips: ["Action constraints can also include a failed action attempt."],
        tasks: task9
    },
    {
        taskNumber: 10,
        taskInfo: "In an action constraint, you can also specify how you want the character to behave when they fail an action. Characters can either perist with their initial plan, substitute it, or drop their goal entirely.",
        taskTips: ["Specify an intent constraint with an action constraint by clicking on the settings icon."],
        tasks: task10
    },
    {
        taskNumber: 11,
        taskInfo: "Use all you have learnt to create a story with both Poppy and Teddy achieving their goals, and Teddy failing to use the Microwave at some point. Teddy and Poppy cannot start with incorrect beliefs. Specifically, create a story where Teddy enters the Kitchen after Poppy disconnects the microwave and fails to use the microwave initially because he still believed the microwave was plugged in.",
        taskTips: [],
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
