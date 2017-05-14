import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/header.css';

export default function Header (props) {
  return (
    <div className='header'>
      <h1><Link to="/">Haiku Foundry</Link></h1>
    </div>
  )
}
