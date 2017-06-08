import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions/index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import '../../css/login.css';
import Header from './header';
import tree from '../../css/images/tree.svg'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const errorMessageGen = (errorCode) => {
  switch (errorCode) {
    case "auth/wrong-password":
      return "Invalid password";
    case "auth/user-not-found":
      return "User not found";
    case "auth/invalid-email":
      return "Invalid email";

    default:
      return null;
  }
}


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
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
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
      .then(
        response => {
          console.log('user successfully signed up');
          this.setState({redirectTo: true});
        },
        error => {
          const errorMessage = errorMessageGen(error.code);
          this.props.dispatch(actions.signInError(errorMessage))
          throw error
        }
      )
      .then(() => this.setState({redirectTo: true}))
      .catch(error => console.log(error));
      // .catch(function(error) {
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   console.log(errorCode, errorMessage)
      // })
  }

  handleLogin(event) {
    const email = this.state.email;
    const password = this.state.password;

    this.props.dispatch(actions.logInUser(email, password))
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(
    //     response => {
    //     console.log('user successfully logged in');
    //     this.props.dispatch(actions.signInSuccess());
    //     },
    //     error => {
    //       const errorMessage = errorMessageGen(error.code);
    //       this.props.dispatch(actions.signInError(errorMessage))
    //       throw error
    //     }
    //   )
    //   .then(() => this.setState({redirectTo: true}))
    //   .catch(error => console.log(error));
  }

  handleDemoLogin (){
    this.setState({
      email: 'test1@test.com',
      password: 'pw1234',
    })
    this.handleLogin();
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
        {this.props.redirectTo && (
          <Redirect to={'/home'}/>
        )}

        <Header logoutHeader={false}/>
        <h1 className="get-started-text">Login or sign up to get started </h1>
        <div className='loginWrapper'>
          <img src={tree} className='logos tree-logo' alt='tree' />
          <TextField
            className="text-fields"
            hintText="jane_doe@email.com"
            floatingLabelText="Email"
            onChange={this.handleEmailChange}
            errorText={this.props.errorEmail}
          />
          <TextField
            className="text-fields"
            floatingLabelText="Password"
            type="password"
            onChange={this.handlePasswordChange}
            errorText={this.props.errorPassword}
          />
          <RaisedButton className="buttons login-button" label="Login"  onClick={this.handleLogin} />
          <RaisedButton className="buttons sign-up-button" label="Sign Up"  onClick={this.handleSignUp} />
          <FlatButton
            className="demo-button"
            label="or click here for demo login"
            style={{width: 200, marginLeft: 48, marginTop: 20 }}
            labelStyle={{fontSize: 10, padding: 10}}
            onClick={this.handleDemoLogin}
          />
        </div>


      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  errorEmail: state.errorEmail,
  errorPassword: state.errorPassword,
  redirectTo: state.redirectTo
});


export default connect(mapStateToProps)(Login);
