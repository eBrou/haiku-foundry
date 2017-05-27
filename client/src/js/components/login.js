import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions/index';
import '../../css/login.css';


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      redirectTo: false
    }
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSignUp(event) {
    console.log('A name was submitted: ' + this.state.email);
    console.log('A password was submitted: ' + this.state.password);
    const email = this.state.email;
    const password = this.state.password;
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('user successfully signed up');

        this.setState({redirectTo: true});
      })
      .then(() => this.setState({redirectTo: true}))
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      })
  }

  handleLogin(event) {
    const email = this.state.email;
    const password = this.state.password;
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('user successfully logged in');
        this.props.dispatch(actions.signInSuccess());
      })
      .then(() => this.setState({redirectTo: true}))
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      })
  }

  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        console.log('user logged OUT');
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      })
  }

  render(){
    return (
      <div className='login'>
        {this.state.redirectTo && (
          <Redirect to={'/compose'}/>
        )}

        <div className='loginWrapper'>
          <form className="sign_in_form" >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="text" name="email" className="form-control login_inputs" placeholder="Email"
                value={this.state.email} onChange={this.handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" name="password" className="form-control login_inputs" placeholder="Password"
                value={this.state.password} onChange={this.handlePasswordChange}
              />
            </div>
            <button className="btn btn-primary sign_up_submit" onClick={this.handleSignUp}>Sign up</button>
            <button className="btn btn-primary log_in_submit" onClick={this.handleLogin}>Log in</button>
            <button className="btn btn-primary sign_out_btn" onClick={this.handleLogout}>Log out</button>
          </form>
        </div>
        <p>{(this.state.redirectTo).toString()}</p>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  loginErrorMessage: state.loginErrorMessage,
});


export default connect(mapStateToProps)(Login);
