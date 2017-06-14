import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import '../../css/sidebar.css';
import * as actions from '../actions/index';

const menuStyles = {
  border: '1px solid #4DD0E1',
  backgroundColor: '#f5f8fa',
  height: '100px',
  whiteSpace: 'normal',
  paddingBottom: '10px',
};


export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      haikuId: null,
      redirectTo: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    // call async action to get user's haikus
    // success action will update state with those haikus
    const userId = this.props.userId;
    this.props.dispatch(actions.getHaikus(userId));
  }

  handleClick(itemId, haikuText) {
    // will open an edit page with selected haiku text
    this.props.dispatch(actions.openEditHaiku(itemId, haikuText));
    this.setState({ redirectTo: true });
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const savedHaikus = this.props.savedHaikus.map((haiku) => {
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
      );
    });
    return (
      <div className="sidebar">
        {this.state.redirectTo && (
          <Redirect to={'/edit'} />
        )}

        <RaisedButton
          label={`${this.props.email}\'s Saved Haikus`}
          onTouchTap={this.handleToggle}
        />
        <Drawer
          open={this.state.open}
          width={320}
        >
          <AppBar
            title="EDIT OR SHARE SAVED HAIKUS"
            style={{
              paddingTop: '10px',
              height: '80px',
              backgroundColor: '#4DD0E1',
              color: 'white',
            }}
            titleStyle={{ fontSize: '16px' }}
            iconElementLeft={
              <IconButton onClick={this.handleToggle} >
                <NavigationClose style={{ marginRight: '0px' }} />
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
