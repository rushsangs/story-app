import storyData from './story'
import constraintsData from './constraints'


export const logToFile = async(message) => {
    try{
        var m = { "message": message};
        console.log("message is ", m);
        const response = await fetch('https://localhost:7273/studylogger',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify(m),
        });
        return;
    } catch(error)
    {
        return;
    }
}

export const getInitialDropdownData = async(task_num) => {
    const response = await fetch('https://localhost:7273/dropdowns/'+task_num);
    const data = await response.json();
    console.log("API Response:");
    console.log(data);
    return data;
}

export const getStoryData = async(requestData, setErrorMessage, setErrorMessageVisible) => {
    //Currently only full paths are working (with external path)
    try{
        const response = await fetch('https://localhost:7273/storygenerator',{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });
        if (!response.ok) {
            console.log("error!");
            setErrorMessage("Error interpreting data. Check your selections and send complete data.");
            setErrorMessageVisible(true);
        }
        else
            setErrorMessage("");
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