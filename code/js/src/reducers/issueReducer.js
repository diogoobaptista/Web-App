import { ActionTypes } from "../constraints/action-types"

const initialState = {
    issue: {
        issueOwner: '',
        issueId: '',
        name: '',
        description: '',
        state: '',
        label: '',
        createDate: '',
        commentsIds: [],
    },
}

export const issueReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_ISSUE:
            return { ...state, issue: payload };
        case ActionTypes.ADD_ISSUE:
            return { ...state, issue: payload };
        case ActionTypes.EDIT_ISSUE:
            return { ...state, issue: payload };
        case ActionTypes.DELETE_ISSUE:
            return { ...state, issue: payload };
        default:
            return state;
    }
};