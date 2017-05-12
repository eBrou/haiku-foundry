import React from 'react';
import ReactDOM from 'react-dom';
// HashRouter is new update for handling history - https://teamtreehouse.com/community/how-do-i-resolve-history-is-marked-required-when-value-is-undefined
import { HashRouter , Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import App from './js/components/App';
import './css/index.css';



///where i left off:  set up router/routes


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
     <App />
    </Provider>,
    document.getElementById('root')
  );
})
