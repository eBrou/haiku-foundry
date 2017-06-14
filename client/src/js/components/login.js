import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions/index';
import '../../css/login.css';
import Header from './header';
import tree from '../../css/images/tree.svg';


function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorEmail: '',
      errorPassword: '',
      redirectTo: false,
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }


  handleSignUp() {
    const email = this.state.email;
    const password = this.state.password;
    // check if email is valid.  if not, exit and set error message
    if (validateEmail(email) !== true) {
      this.setState({ errorEmail: 'Please enter a valid email address' });
      return;
    }
    // check if password is at least 6 characters
    if (password.length < 6) {
      this.setState({ errorPassword: 'Please enter a password of 6 characters or more' });
      return;
    }
    this.props.dispatch(actions.signUpUser(email, password));
  }

  handleLogin() {
    const email = this.state.email;
    const password = this.state.password;
    // check if email is valid.  if not, exit and set error message
    if (validateEmail(email) !== true) {
      this.setState({ errorEmail: 'Please enter a valid email address' });
      return;
    }
    // check if password is at least 6 characters
    if (password.length < 6) {
      this.setState({ errorPassword: 'Please enter a password of 6 characters or more' });
      return;
    }
    // if checks pass, dispatch action to login
    this.props.dispatch(actions.logInUser(email, password));
  }

  handleDemoLogin(event) {
    event.preventDefault();
    const email = 'test1@test.com';
    const pw = 'pw1234';
    this.setState({
      email: email,
      password: pw,
    });
    this.props.dispatch(actions.logInUser(email, pw));
  }


  render() {
    return (
      <div className="login">
        {this.props.redirectTo && (
          <Redirect to={'/home'} />
        )}

        <Header logoutHeader={false} />
        <h1 className="get-started-text">Login or sign up to get started </h1>
        <div className="loginWrapper">
          <img src={tree} className="logos tree-logo" alt="tree" />
          <form >
            <TextField
              className="text-fields"
              hintText="jane_doe@email.com"
              floatingLabelText="Email"
              onChange={this.handleEmailChange}
              errorText={this.props.errorEmail !== null ?
                (this.props.errorEmail) :
                (this.state.errorEmail)}
              required
            />
            <TextField
              className="text-fields"
              floatingLabelText="Password"
              type="password"
              onChange={this.handlePasswordChange}
              errorText={this.props.errorPassword !== null ?
                (this.props.errorPassword) :
                (this.state.errorPassword)}
              required
            />
            <RaisedButton
              className="buttons login-button"
              label="Login"
              onClick={this.handleLogin}
            />
            <RaisedButton
              className="buttons sign-up-button"
              label="Sign Up"
              onClick={this.handleSignUp}
            />
          </form>
          <FlatButton
            className="demo-button"
            label="or click here for demo login"
            style={{ width: 200, marginLeft: 48, marginTop: 20 }}
            labelStyle={{ fontSize: 10, padding: 10 }}
            onClick={this.handleDemoLogin}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  errorEmail: state.errorEmail,
  errorPassword: state.errorPassword,
  redirectTo: state.redirectTo,
});


export default connect(mapStateToProps)(Login);
