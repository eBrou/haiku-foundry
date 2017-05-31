import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Refresh } from 'react-router-dom';
import firebase from 'firebase';
import 'isomorphic-fetch';
import * as actions from '../actions/index';
import '../../css/compose.css';
import Sidebar from './sidebar';

export class Compose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textArea: 'looking at my desk: / paper, pen, water bottle, / and a grey laptop.',
      redirectTo: false,
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSave(event) {
    event.preventDefault();
    // console.log("text saved: " + this.state.textArea);
    const haiku = this.state.textArea
    this.props.dispatch(actions.saveHaiku(haiku));
    // clears the form or should i do another way?
    this.setState({textArea: ''})
  }


  handleShare(event) {
    event.preventDefault();
    // console.log("text SHARED: " + this.state.textArea)
  }

  handleTextChange(event) {
    this.setState({textArea: event.target.value});
  }

  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        // console.log('user logged OUT');
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      })
  }

  componentDidMount() {
    this.setState({textArea: ''})
  }


  render () {
    return (
      <div className='compose'>
        {this.state.redirectTo && (
          <Refresh />
        )}
        <Sidebar />
        <div className='textAreaWrapper'>
          <form className="haiku_form" >
            <textarea
              rows="4"
              cols="50"
              onChange={this.handleTextChange}
              value={this.state.textArea}>
            </textarea>
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleShare}>Share</button>
          </form>
        </div>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}
// defaultValue={this.state.textArea}

const mapStateToProps = (state, props) => ({
  loginErrorMessage: state.loginErrorMessage,
  email: state.email,
  userId: state.userId,
  tester: state.tester,
});

export default connect(mapStateToProps)(Compose);
