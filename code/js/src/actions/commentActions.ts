import { ActionTypes } from '../constraints/action-types'


export const getCommentAction = (comment: any) => {
    return {
        type: ActionTypes.GET_COMMENT,
        payload: comment
    }
}

export const deleteCommentAction = () => {
    return {
        type: ActionTypes.DELETE_COMMENT,
        payload: {}
    }
}

export const editCommentAction = (comment: any) => {
    return {
        type: ActionTypes.EDIT_COMMENT,
        payload: comment
    }
}