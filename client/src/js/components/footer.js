import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/footer.css';

export default function Header (props) {
  return (
    <div className='footerComponent'>
      <footer>
        <span className='footerText'>This is a footer</span>
      </footer>
    </div>
  )
}
