import { ActionTypes } from '../constraints/action-types'


export const getProjectAction = (project: any) => {
    return {
        type: ActionTypes.GET_PROJECT,
        payload: project
    }
}

export const addProjectsAction = (project: any) => {
    return {
        type: ActionTypes.ADD_PROJECT,
        payload: project
    }
}

export const editProjectAction = (project: any) => {
    return {
        type: ActionTypes.EDIT_PROJECT,
        payload: project
    }
}