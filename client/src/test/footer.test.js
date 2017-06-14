import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Footer from '../js/components/footer';


describe('<Footer />', () => {
  it('renders component with class "footerComponent"', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.hasClass('footerComponent'));
  });

  it('renders correct children', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.text()).to.equal('Created by Eric Broucek ');
    expect(wrapper.find('i')).to.have.length(1);
  });
});
