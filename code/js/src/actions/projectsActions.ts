import { ActionTypes } from '../constraints/action-types'


export const getProjectsAction = (projects: any) => {
    return {
        type: ActionTypes.GET_PROJECTS,
        payload: projects
    }
}

export const deleteProjectsAction = (projects: any) => {
    return {
        type: ActionTypes.REMOVE_PROJECTS,
        payload: projects
    }
}