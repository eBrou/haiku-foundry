import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Home } from '../js/components/home';
import Header from '../js/components/header';
import Sidebar from '../js/components/sidebar';
import Compose from '../js/components/compose';


describe('<Home />', () => {
  it('renders a div component with 3 children', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('div').children()).to.have.length(3);
  });

  it('renders correct children', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(Header)).to.have.length(1);
    expect(wrapper.find(Sidebar)).to.have.length(1);
    expect(wrapper.find(Compose)).to.have.length(1);
  });
});
