import { ActionTypes } from "../constraints/action-types"

const initialState = {
    projects: [],
}

export const projectsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_PROJECTS:
            return { ...state, projects: payload };
        case ActionTypes.REMOVE_PROJECTS:
            return { ...state, projects: payload };
        default:
            return state;
    }
};