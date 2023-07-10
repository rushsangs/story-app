import storyData from './story'
import constraintsData from './constraints'
import { sometimesAction } from './actions'


export const getStoryData = async() => {
    //Currently only full paths are working (with external path)
    const response = await fetch('https://localhost:7273/storygenerator');
    const data = await response.json();
    console.log(data);
    return data;
}

export const getConstraintsData = () => {
    return constraintsData
}

export const getNextDropdownData = () => {
    
    return sometimesAction
}
// const response = await fetch('weatherforecast');
//     const data = await response.json();