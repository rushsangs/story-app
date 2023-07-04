import storyData from './story'
import constraintsData from './constraints'
import { sometimesAction } from './actions'


export const getStoryData = async () => {
    const response = await fetch('http://localhost:7273/weatherforecast');
    const data = await response.json();
    return data
}

export const getConstraintsData = () => {
    return constraintsData
}

export const getNextDropdownData = () => {
    return sometimesAction
}
// const response = await fetch('weatherforecast');
//     const data = await response.json();