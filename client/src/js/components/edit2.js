import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import 'isomorphic-fetch';
import '../../css/edit.css';
import Header from './header';
import Compose from './compose';

export class Edit2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // split haiku to be edited into separate lines
    const haikuArr = this.props.haikuText.split(' // ')
    return (
      <div className='edit-component'>
        {this.state.redirectTo && (
          <Redirect to={'/home'} />
        )}
        <Header logoutHeader={true} />
        <Compose
          line1={haikuArr[0]}
          line2={haikuArr[1]}
          line3={haikuArr[2]}
          deleteButton={true}
          backButton={true}
          message="Edit a Saved Haiku..."
          buttonsDisabled={false}
          saveButton={false}
          saveChangesButton={true}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  loginErrorMessage: state.loginErrorMessage,
  email: state.email,
  userId: state.userId,
  haikuText: state.haikuTextToEdit,
  haikuId: state.haikuIdToEdit,
});

export default connect(mapStateToProps)(Edit2);
