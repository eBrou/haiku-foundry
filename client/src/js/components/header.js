import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../actions/index';
import FlatButton from 'material-ui/FlatButton';
import rockGarden from '../../css/images/rock-garden-white.svg';
import '../../css/header.css';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,
      redirectToLanding: false
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  handleLogout(event){
    event.preventDefault();
    this.props.dispatch(actions.logOutUser());
  }

  handleLoginClick(){
    this.setState({
      redirectToLogin: true,
    })
  }

  handleIconClick(){
    this.setState({
      redirectToLanding: true,
    })
  }

  render(){
    return (
      <div className='header'>
        {this.state.redirectToLogin && (
          <Redirect to={'/login'}/>
        )}
        {this.state.redirectToLanding && (
          <Redirect to={'/'}/>
        )}
        <img src={rockGarden} className='logo-header' alt='rock garden' />
        <h1><Link to="/" style={{color: 'white'}}>
        HAIKU FOUNDRY</Link></h1>
        <div className='headerOptions options-header'>

          {this.props.loginHeader ? (
            <FlatButton label="Login / Sign Up" className="login-button" onClick={this.handleLoginClick} />
          ) : null }

          {this.props.userHeader ? (
            `${this.props.email} logged in`
          ) : null }

          {this.props.logoutHeader ? (
            <FlatButton label="Logout" onClick={this.handleLogout}/>
          ) : null }




        </div>


      </div>
    )
  }
}



const mapStateToProps = (state, props) => ({
  email: state.email,
  loggedIn: state.loggedIn,
});

export default connect()(Header);
