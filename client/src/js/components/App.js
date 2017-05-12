import React, { Component } from 'react';
import logo from '../../logo.svg';
import mockData from '../../mock-data.js';
import '../../css/App.css';


const haikus = mockData.haikus.map((haiku, i) => {
  return <p key={i}>{haiku.date}: {haiku.text}</p>
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {haikus}
      </div>
    );
  }
}

export default App;
