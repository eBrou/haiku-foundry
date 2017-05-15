import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';
import App from './js/components/App';
import './css/index.css';

injectTapEventPlugin();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Router>
          <Route path="/*" component={App} />
          
        </Router>
      </Provider>
    </MuiThemeProvider>  ,
    document.getElementById('root')
  );
})
