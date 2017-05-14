import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import mockData from '../../mock-data.js';

const menuStyles = {
      border: '2px solid #FF9800',
      backgroundColor: '#ffd699',
      height: '100px',
      whiteSpace: 'normal'
    }

const haikus = mockData.haikus.map((haiku, i) => {
  return <MenuItem key={i} style={menuStyles}>{haiku.date}: {haiku.text}</MenuItem>
})



export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle Drawer"
          onTouchTap={this.handleToggle}
        />
        <Drawer open={this.state.open}
          width={400}
        >
          <MenuItem>
            Saved Haikus...
            <button className="hideSavedButton"
              onTouchTap={this.handleToggle}
            >
              Hide
            </button>
          </MenuItem>
          {haikus}
        </Drawer>
      </div>
    );
  }
}

// <MenuItem>Menu Item</MenuItem>
// <MenuItem>Menu Item 2</MenuItem>
