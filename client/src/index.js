import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';
import App from './js/components/App';
import * as firebase from 'firebase';
import './css/index.css';

injectTapEventPlugin();



// firebase.initializeApp(config)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>  ,
    document.getElementById('root')
  );
})
