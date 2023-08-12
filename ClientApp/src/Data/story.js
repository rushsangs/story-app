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
    {key: 0, text: "Teddy starts in Teddy's Room.", status: 0, test:((x,y)=> x!== undefined && x.filter( (step) => (step.includes("Teddy walks over from TeddysRoom to"))).length > 0)},
    {key: 1, text: "Soup is not heated up initially.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats")).length > 0)},
    {key: 2, text: "Teddy heats up the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats")).length > 0)},
    {key: 3, text: "Teddy eats the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

export const task2 = [
    {key: 0, text: "Poppy starts in Poppy's Room.", status: 0, test:((x,y)=> x!== undefined && x.filter( (step) => (step.includes("Poppy walks over from PoppysRoom to"))).length > 0)},
    {key: 1, text: "Bread is not heated up initially.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Poppy uses ")).length > 0)},
    {key: 2, text: "Poppy heats up the Bread.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Poppy uses")).length > 0)},
    {key: 3, text: "Poppy eats the Bread.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Poppy eats the Bread")).length > 0)},
]
export const task3 = [
    {key: 0, text: "The power outlet is not powering the Microwave.", status: 0, test:((x,y)=> x!== undefined)},
    {key: 0, text: "Teddy believes the Microwave is powered.", status: 0, test:((x,y)=> y!== undefined)},
    {key: 1, text: "Soup is not heated up initially.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats")).length > 0)},
    {key: 2, text: "Teddy heats up the soup without using the microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats the Soup over the stove.")).length > 0)},
    {key: 3, text: "Teddy eats the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

  export const task4 = [
    {key: 0, text: "The power outlet is powering the Microwave.", status: 0, test:((x,y)=> x!== undefined)},
    {key: 1, text: "Teddy believes the Microwave is not powered.", status: 0, test:((x,y)=> x!== undefined)},
    {key: 2, text: "Teddy heats up the soup without using the microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats the Soup over the stove.")).length > 0)},
    {key: 3, text: "Teddy eats the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

  export const task5 = [
    {key: 0, text: "The power outlet is powering the Microwave.", status: 0, test:((x,y)=> x!== undefined)},
    {key: 1, text: "Teddy believes the Microwave is not powered.", status: 0, test:((x,y)=> x!== undefined)},
    {key: 2, text: "Teddy heats up the soup without using the microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats the Soup over the stove.")).length > 0)},
    {key: 3, text: "Teddy eats the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];

  export const task6 = [
    {key: 0, text: "The power outlet is powering the Microwave.", status: 0, test:((x,y)=> x!== undefined)},
    {key: 1, text: "Teddy believes the Microwave is not powered.", status: 0, test:((x,y)=> x!== undefined)},
    {key: 2, text: "Teddy heats up the soup without using the microwave.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy heats the Soup over the stove.")).length > 0)},
    {key: 3, text: "Teddy eats the soup.", status: 0, test:((x,y)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
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
]