import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Landing } from '../js/components/landing';
import Header from '../js/components/header';
import RaisedButton from 'material-ui/RaisedButton';


describe('<Landing />', () => {
  it('renders a div with class name "landing"', () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.hasClass('landing'));

  });

  it('renders correct children', () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.find(Header)).to.have.length(1);
    expect(wrapper.find('div.landingDivs')).to.have.length(3);
    expect(wrapper.find('div.landingDivs').children()).to.have.length(6);
    expect(wrapper.find('img')).to.have.length(3);
    expect(wrapper.find('div.landingTextDivs')).to.have.length(3);
    expect(wrapper.find('h1')).to.have.length(3);
    expect(wrapper.find(RaisedButton)).to.have.length(1);
  });

});

// <img src={crane} className='logos' alt='crane' />
// <div className='landingTextDivs'>
//   <h1 className='landing-text'>Compose your own haikus</h1>
// </div>
