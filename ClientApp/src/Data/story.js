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
    {key: 0, text: "Teddy starts in Teddy's Room.", status: 0, test:((x)=> x!== undefined && x.filter( (step) => (step.includes("Teddy walks over from TeddysRoom to"))).length > 0)},
    {key: 1, text: "Soup is not heated up initially.", status: 0, test:((x)=> x!== undefined && x.filter( step => step.includes("Teddy heats")).length > 0)},
    {key: 2, text: "Teddy heats up the soup.", status: 0, test:((x)=> x!== undefined && x.filter( step => step.includes("Teddy heats")).length > 0)},
    {key: 3, text: "Teddy eats the soup.", status: 0, test:((x)=> x!== undefined && x.filter( step => step.includes("Teddy eats the Soup")).length > 0)},
  ];