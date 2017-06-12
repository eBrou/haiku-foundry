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
    const userId = this.props.userId
    this.props.dispatch(actions.getHaikus(userId))
  }

  componentDidUpdate() {
    // makes sure saved haikus are reloaded in sidebar on save
    const userId = this.props.userId
    this.props.dispatch(actions.getHaikus(userId))
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
      //split haiku back up by lines
      // const haikuArr = haiku.haikuText.split(' // ')
      // `${haikuArr[0]}\n${haikuArr[1]}\n${haikuArr[2]}`
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
      <div className="sidebar">
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
  userId: state.userId,
});

export default connect(mapStateToProps)(Sidebar);
