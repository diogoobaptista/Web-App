import { ActionTypes } from '../constraints/action-types'


export const getCommentsAction = (projects: any) => {
    return {
        type: ActionTypes.GET_COMMENTS,
        payload: projects
    }
}

export const addCommentAction = (comment: any) => {
    return {
        type: ActionTypes.ADD_COMMENT,
        payload: comment
    }
}
