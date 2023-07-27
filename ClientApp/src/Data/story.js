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
    {key: 0, text: "Teddy dies during the story.", status: 0, test:((x)=> x!== undefined && x.filter( (step) => ("Teddy dies."  === step)).length > 0)},
    {key: 1, text: "Teddy walks during the story.", status: 0, test:((x)=> x!== undefined && x.filter( step => "Teddy walks." === step).length > 0)},
  ];