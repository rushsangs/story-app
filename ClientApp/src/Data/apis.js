import storyData from './story'
import constraintsData from './constraints'
import { sometimesAction } from './actions'


export const getStoryData = () => {
    return storyData
}

export const getConstraintsData = () => {
    return constraintsData
}

export const getNextDropdownData = () => {
    return sometimesAction
}