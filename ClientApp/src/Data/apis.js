import storyData from './story'
import constraintsData from './constraints'
import { sometimesAction } from './actions'
import { compress_dropdowns } from './dropdowns';



export const getInitialDropdownData = async() => {
    const response = await fetch('https://localhost:7273/dropdowns');
    const data = await response.json();
    return compress_dropdowns(data);
}

export const getStoryData = async(requestData) => {
    //Currently only full paths are working (with external path)
    try{
        const response = await fetch('https://localhost:7273/storygenerator',{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });
        const data = await response.json();
        return data;
    } catch(error)
    {
        return;
    }
}


export const getNextDropdownData = async(requestData) => {
    const response = await fetch('https://localhost:7273/dropdowns',{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });
    const data = await response.json();
    return data;
}

export const getMockStoryData = async() => {
    return storyData
}

export const getConstraintsData = () => {
    return constraintsData
}