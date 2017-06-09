import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Refresh } from 'react-router-dom';
import firebase from 'firebase';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import mockData from '../../mock-data.js';
import '../../css/sidebar.css';
import * as actions from '../actions/index';

const menuStyles = {
      border: '1px solid #4DD0E1',
      backgroundColor: '#f5f8fa',
      height: '100px',
      whiteSpace: 'normal',
      paddingBottom: '10px'
    }

// const haikus = mockData.haikus.map((haiku, i) => {
//   return <MenuItem key={i} style={menuStyles}>{haiku.date}: {haiku.text}</MenuItem>
// })

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      haikuId: null,
      redirectTo: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // call async action to get user's haikus
    // success action will update state with those haikus
    // console.log('componentDidMount happening')
    this.props.dispatch(actions.getHaikus())
  }

  handleClick(itemId, haikuText){
    // will open an edit page with selected haiku text
    this.props.dispatch(actions.openEditHaiku(itemId, haikuText));
    this.setState({redirectTo: true});
  }



  // toggleEditing( itemId ) {
  //   this.setState( { editing: itemId } );
  // }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    const savedHaikus = this.props.savedHaikus.map((haiku, i) => {
      const date = haiku.date.slice(4, -24);
      return (
        <MenuItem
        className="savedHaiku"
        key={haiku._id}
        style={menuStyles}
        onTouchTap={this.handleClick.bind(null, haiku._id, haiku.haikuText)}
        >
        {date}:{'  '}{haiku.haikuText}
        </MenuItem>
      )
    })
    // console.log(this.props.savedHaikus)
    return (
      <div>
        {this.state.redirectTo && (
          <Redirect to={'/edit'}/>
        )}

        <RaisedButton
          label={`${this.props.email}\'s Saved Haikus`}
          onTouchTap={this.handleToggle}
        />
        <Drawer open={this.state.open}
          width={320}
        >
          <AppBar title="EDIT OR SHARE SAVED HAIKUS"
            style={{
              paddingTop: '10px',
              height: '80px',
              backgroundColor: '#4DD0E1',
              color: 'white',
            }}
            titleStyle={{fontSize: '16px'}}
            iconElementLeft={
              <IconButton onClick={this.handleToggle} >
                <NavigationClose style ={{marginRight:'0px'}} />
              </IconButton>}
          />
          {savedHaikus}
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  savedHaikus: state.savedHaikus,
  email: state.email,
});

export default connect(mapStateToProps)(Sidebar);


// <MenuItem
//   style={{
//     height: '80px',
//     backgroundColor: '#4DD0E1',
//     color: 'white',
//   }}
//   InnerDivStyle={{
//     lineHeight: '50%',
//     textAlign: 'center'
//   }}
// >
//   Click any saved haiku to edit or share <br></br>
//   <RaisedButton
//     className="hide-button"
//     label="Hide"
//     style={{width: '50px', height: '36px',  marginBottom: '20px' }}
//     labelStyle={{color: '#4DD0E1'}}
//     onClick={this.handleToggle}
//   />
// </MenuItem>
