import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Header } from '../js/components/header';


describe('<Header />', () => {
  it('renders component with class "header"', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.hasClass('header'));
  });

  it('renders correct children', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('img')).to.have.length(1);
    expect(wrapper.find('h1')).to.have.length(1);
    expect(wrapper.find('div.headerOptions')).to.have.length(1);
  });
});
