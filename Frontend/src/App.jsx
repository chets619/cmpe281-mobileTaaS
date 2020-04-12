import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './App.scss';
import Main from './Components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import store, { history } from './Redux/Store/store';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* <BrowserRouter> */}
        <div className="app">
          <Main />
        </div>
        {/* </BrowserRouter> */}

      </ConnectedRouter>
    </Provider>
  );
}

export default App;
