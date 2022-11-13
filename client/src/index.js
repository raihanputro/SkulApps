import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import reducers from './reducers';
import './index.css';

document.getElementById('root').style.fontFamily = "Roboto, sans-serif";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root  = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

