import { ActionTypes } from '../constraints/action-types'


export const getIssueAction = (issue: any) => {
    return {
        type: ActionTypes.GET_ISSUE,
        payload: issue
    }
}

export const addIssueAction = (issue: any) => {
    return {
        type: ActionTypes.ADD_ISSUE,
        payload: issue
    }
}

export const editIssueAction = (issue: any) => {
    return {
        type: ActionTypes.EDIT_ISSUE,
        payload: issue
    }
}

export const deleteIssueAction = (issue: any) => {
    return {
        type: ActionTypes.DELETE_ISSUE,
        payload: issue
    }
}