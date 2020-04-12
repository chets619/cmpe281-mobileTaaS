import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../Reducers/rootReducer';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))));

export default store;