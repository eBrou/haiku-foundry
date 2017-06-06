import React from 'react';
import Header from './header';
import '../../css/landing.css';
import crane from '../../css/images/crane.svg'
import rockGarden from '../../css/images/rock-garden.svg'
import tree from '../../css/images/tree.svg'



export default function Landing (props) {
  return (
    <div className='landing'>
      <Header loginHeader={true}/>
      <div className='landingDivs landingDiv1'>
        <img src={crane} className='logos' alt='crane' />
        <div className='landingTextDivs'>
          <h3>Compose your own haikus</h3>
        </div>

      </div>
      <div className='landingDivs landingDiv2'>
        <img src={rockGarden} className='logos rock-garden' alt='rock garden' />
        <div className='landingTextDivs'>
          <h3>Save them for later or share with friends</h3>
        </div>
      </div>
      <div className='landingDivs landingDiv3'>
        <img src={tree} className='logos' alt='tree' />
        <div className='landingTextDivs'>
          <h3>Ready to Get started?</h3>
        </div>
      </div>



    </div>
  )
}
