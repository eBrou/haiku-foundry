import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {cyan500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';
import App from './js/components/App';
import * as firebase from 'firebase';
import './css/index.css';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  }
});

// firebase.initializeApp(config)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>  ,
    document.getElementById('root')
  );
})
