import React from 'react';
import '../../css/compose.css';
import Sidebar from './sidebar';

export default function Compose (props) {
  return (
    <div className='compose'>
      <Sidebar />
      <div className='textAreaWrapper'>
        <textarea rows="4" cols="50">I am a textarea</textarea>
        <button>Save</button>
        <button>Share</button>
      </div>
    </div>
  )
}
