import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import '../../css/App.css';
import Header from './header';
import Landing from './landing';
import Login from './login';
import Compose from './compose';
import Footer from './footer';


// TODO: add sidebar

export default function App (props) {
    return (
        <Router >
          <div className="App">
            <Header />
            <main>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/compose" component={Compose} />
              </Switch>
            </main>

            <Footer />
          </div>
        </Router>
    );
}
