import React from 'react';
import { connect } from 'react-redux';
import Compose from './compose';
import Header from './header';
import Sidebar from './sidebar';


export default function Home() {
  return (
    <div>
      <Header logoutHeader={true} />
      <Sidebar />
      <Compose
        buttonsDisabled={true}
        saveButton={true}
      />
    </div>
  )
}
