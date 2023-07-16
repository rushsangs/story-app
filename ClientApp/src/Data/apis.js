import storyData from './story'
import constraintsData from './constraints'
import { sometimesAction } from './actions'


export const getStoryData = async(requestData) => {
    //Currently only full paths are working (with external path)
    try{
        console.log(JSON.stringify(requestData));
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
        console.log(error);
        return;
    }
    // console.log(data);
    
}


export const getMockStoryData = async() => {
    return storyData
}

export const getConstraintsData = () => {
    return constraintsData
}

export const getNextDropdownData = () => {
    
    return sometimesAction
}
// const response = await fetch('weatherforecast');
//     const data = await response.json();