import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { App } from '../js/components/app';


describe('<App />', () => {
  it('renders component with class appContainer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.hasClass('App'));
  });
