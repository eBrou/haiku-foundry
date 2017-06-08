import React from 'react';
import { connect } from 'react-redux';
import Compose from './compose';
import Header from './header';
import Sidebar from './sidebar';


export class Home extends React.Component {
  constructor(props) {
    super(props);
  }


  render () {
    return (
      <div>
        <Header logoutHeader={true}/>
        <Sidebar />
        <Compose
          buttonsDisabled={true}
          saveButton={true}
         />
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  loginErrorMessage: state.loginErrorMessage,
  email: state.email,
  userId: state.userId,
  haikuId: state.haikuIdToEdit,
});

export default connect(mapStateToProps)(Home);
