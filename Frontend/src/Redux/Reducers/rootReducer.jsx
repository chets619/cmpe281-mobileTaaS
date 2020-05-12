import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import profileReducer from './profileReducer';
import projectReducer from './projectReducer';
import emulatorReducer from './emulatorReducer';

const rootReducer = (history) => combineReducers({
    user: profileReducer,
    projects: projectReducer,
    emulator: emulatorReducer,
    router: connectRouter(history)
});

export default rootReducer;