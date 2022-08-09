import { ActionTypes } from "../constraints/action-types"

const initialState = {
    comment: {
        commentId: '',
        description: '',
        date: '',
        commentOwner: ''
    },
}

export const commentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_COMMENT:
            return { ...state, comment: payload };
        case ActionTypes.EDIT_COMMENT:
            return { ...state, comment: payload };
        case ActionTypes.DELETE_COMMENT:
            return state;
        default:
            return state;
    }
};