import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import profileReducer from './profileReducer';
import projectReducer from './projectReducer';

const rootReducer = (history) => combineReducers({
    user: profileReducer,
    projects: projectReducer,
    router: connectRouter(history)
});

export default rootReducer;