import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import 'isomorphic-fetch';
import * as actions from '../actions/index';
import '../../css/edit.css';
// import Sidebar from './sidebar';

export class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textArea: null,
      redirectTo: false,
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSave(event) {
    event.preventDefault();
    // save changes triggers a PUT call to db
    const haikuText = this.state.textArea
    this.props.dispatch(actions.saveEditHaiku(haikuText));
    // immediately redirect to the compose page
    this.setState({redirectTo: true});
  }

  handleShare(event) {
    event.preventDefault();
    // console.log("text SHARED: " + this.state.textArea)
  }

  handleTextChange(event) {
    this.setState({textArea: event.target.value});
  }

  handleBack() {
    this.setState({redirectTo: true});
  }

  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut()
      // .then(() => {
      //   // console.log('user logged OUT');
      // })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      })
  }

  handleDelete(event) {
    event.preventDefault();
    console.log('handle delete triggered', this.props.haikuId)
    const haikuId = this.props.haikuId
    this.props.dispatch(actions.deleteHaiku(this.props.haikuId));
    // immediately redirect to the compose page
    this.setState({redirectTo: true});
  }

  // componentDidMount() {
  //
  // }


  render () {
    return (
      <div className='compose'>
        {this.state.redirectTo && (
          <Redirect to={'/compose'}/>
        )}
        <div className='textAreaWrapper'>
          <form className="haiku_form" >
            <textarea rows="4" cols="50" defaultValue={this.props.haikuText} onChange={this.handleTextChange}></textarea>
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleShare}>Share</button>
          </form>
          <button onClick={this.handleBack}>Back</button>
          <button onClick={this.handleLogout}>Logout</button>
          <button onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  loginErrorMessage: state.loginErrorMessage,
  email: state.email,
  userId: state.userId,
  haikuText: state.haikuTextToEdit,
  haikuId: state.haikuIdToEdit,
});

export default connect(mapStateToProps)(Edit);
