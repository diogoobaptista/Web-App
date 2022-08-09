import { ActionTypes } from "../constraints/action-types"

const initialState = {
    comments: [],
}

export const commentsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_COMMENTS:
            return { ...state, comments: payload };
        case ActionTypes.ADD_COMMENT:
            return { ...state, comments: { ...comments, payload } };
        default:
            return state;
    }
};