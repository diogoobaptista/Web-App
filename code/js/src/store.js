import { createStore, combineReducers } from 'redux';
import { issueReducer } from './reducers/issueReducer'
import { projectsReducer } from './reducers/projectsReducer'
import { projectReducer } from './reducers/projectReducer';
import { commentsReducer } from './reducers/commentsReducer';
import { commentReducer } from './reducers/commentReducer';

const reducers = combineReducers({
    allProjects: projectsReducer,
    projectDetails: projectReducer,
    issueDetails: issueReducer,
    commentsDetails: commentsReducer,
    commentDetail: commentReducer,
})

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store