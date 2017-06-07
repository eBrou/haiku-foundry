import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import '../../css/landing.css';
import crane from '../../css/images/crane.svg';
import rockGarden from '../../css/images/rock-garden.svg';
import tree from '../../css/images/tree.svg';



export class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick(){
    this.setState({
      redirectToLogin: true,
    })
  }

  render() {

    return (
    <div className='landing'>
      {this.state.redirectToLogin && (
        <Redirect to={'/login'}/>
      )}

      <Header loginHeader={true}/>
      <div className='landingDivs landingDiv1'>
        <img src={crane} className='logos' alt='crane' />
        <div className='landingTextDivs'>
          <h1 className='landing-text'>Compose your own haikus</h1>
        </div>

      </div>
      <div className='landing-break'></div>

      <div className='landingDivs landingDiv2'>
        <img src={rockGarden} className='logos rock-garden' alt='rock garden' />
        <div className='landingTextDivs landing-text-div2'>
          <h1 className='landing-text'>Save them for later or share with others</h1>
        </div>
      </div>
      <div className='landing-break'></div>

      <div className='landingDivs landingDiv3'>
        <img src={tree} className='logos' alt='tree' />
        <div className='landingTextDivs'>
          <h1 className='landing-text'>Ready to Get started?</h1>


            <RaisedButton label="Click here to begin" style={{marginLeft: 25}} className="login-button" onClick={this.handleLoginClick} />

        </div>
      </div>



    </div>
    )
}
}


// <h1 className="landing-text link-text"><Link to="/login" style={{'text-decoration': 'underline'}} ></Link></h1>
export default connect()(Landing);
