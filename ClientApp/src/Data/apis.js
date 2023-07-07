import storyData from './story'
import constraintsData from './constraints'
import { sometimesAction } from './actions'


export const getStoryData = async() => {
    // APPROACH 1 NOT WORKING
    // const response = fetch('weatherforecast')
    // .then((response) => {response.json()})
    // .then((actualData) => {console.log(actualData.body.)});
    
    // APPROACH 2 NOT WORKING
    const response = await fetch('https://localhost:7273/storygenerator');
    const data = await response.json();
    console.log(data);
    return data;
    // return storyData
}

export const getConstraintsData = () => {
    return constraintsData
}

export const getNextDropdownData = () => {
    return sometimesAction
}
// const response = await fetch('weatherforecast');
//     const data = await response.json();