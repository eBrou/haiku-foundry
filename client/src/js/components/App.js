import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Match, Redirect, Switch, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import '../../css/App.css';
import Header from './header';
import Landing from './landing';
import Login from './login';
import Compose from './compose';
import Edit from './edit';
import Footer from './footer';


const config = {
    apiKey: "AIzaSyDIUkh3UgN_IzQiMzL6gXrW195toiJ0Gt4",
    authDomain: "haiku-foundry.firebaseapp.com",
    databaseURL: "https://haiku-foundry.firebaseio.com",
    projectId: "haiku-foundry",
    storageBucket: "haiku-foundry.appspot.com",
    messagingSenderId: "137686379806"
  };

// consts for easier firebase usage
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.database(); //the real-time database
const auth = firebaseApp.auth(); //the firebase auth namespace

const storageKey = 'KEY_FOR_LOCAL_STORAGE';

const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}

// Altered Match component that checks auth before routing
const RouteWhenAuthorized = ({component: Component, ...rest}) => (
  <Route {...rest} render={renderProps => (
    isAuthenticated() ? (
      <Component {...renderProps} />
    ) : (
      <Redirect to={ {
        pathname: '/',
        state: {from: renderProps.location}
      } } />
    )
  )}/>
)


export default class App extends React.Component {
  state = {
    uid: null
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({uid: user.uid});
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({uid: null});
      }
    });
  }

  render() {
    return (
        <Router >
          <div className="App">
            <Header />
            <main>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/login" component={Login} />
                <RouteWhenAuthorized path="/compose" component={Compose} />
                <RouteWhenAuthorized path="/edit" component={Edit} />
              </Switch>
            </main>

            <Footer />
          </div>
        </Router>
    );
  }
}


// render() {
//   return (
//       <Router >
//         <div className="App">
//           <Header />
//           <main>
//             <Switch>
//               <Route exact path="/" component={Landing} />
//               <Route path="/login" component={Login} />
//               <Route path="/compose" component={Compose} />
//             </Switch>
//           </main>
//
//           <Footer />
//         </div>
//       </Router>
//   );
// }
