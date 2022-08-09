import { ActionTypes } from "../constraints/action-types"

const initialState = {
    project: {
        projectOwner: '',
        projectId: '',
        name: '',
        description: '',
        issuesIds: [],
    },
}

export const projectReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_PROJECT:
            return { ...state, project: payload };
        case ActionTypes.ADD_PROJECT:
            return { ...state, project: payload };
        default:
            return state;
    }
};