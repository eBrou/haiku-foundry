import React from 'react';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
// import github from '../../css/images/GitHub-Mark-32px.png';
import '../../css/footer.css';

export default function Header (props) {
  return (
    <div className='footerComponent'>
       Created by Eric Broucek <a href="https://github.com/eBrou/haiku-foundry" target="_blank">
         <i className="fa fa-github github-button" aria-hidden="true" ></i>
       </a>






    </div>
  )
}


// <span className='footerText'>This is a footer</span>

// <FlatButton
//   href="https://github.com/eBrou/haiku-foundry"
//   target="_blank"
//   primary={true}
//   icon={<FontIcon className="muidocs-icon-custom-github" />}
//   style={{margin: 5, height: 15}}
// />

// Created by <a href="https://github.com/eBrou/haiku-foundry" target="_blank">Eric Broucek </a>
// <FontIcon className="muidocs-icon-custom-github" />
