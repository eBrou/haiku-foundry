import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Refresh } from 'react-router-dom';
import firebase from 'firebase';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import mockData from '../../mock-data.js';
import * as actions from '../actions/index';

const menuStyles = {
      border: '2px solid #00ACC1',
      backgroundColor: '#f5f8fa',
      height: '100px',
      whiteSpace: 'normal'
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
        {date}: {haiku.haikuText}
        <i className="fa fa-pencil-square-o pencil" aria-hidden="true"></i>
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
          label="Saved Haikus"
          onTouchTap={this.handleToggle}
        />
        <Drawer open={this.state.open}
          width={320}
        >
          <MenuItem

            style={{
              height: '80px',
              backgroundColor: '#4DD0E1',
              color: 'white',
            }}
          >
            Saved Haikus <br></br>
            Click any to edit or share
            <button className="hideSavedButton"
              onTouchTap={this.handleToggle}
            >
              Hide
            </button>
          </MenuItem>
          {savedHaikus}
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  savedHaikus: state.savedHaikus,
});

export default connect(mapStateToProps)(Sidebar);
