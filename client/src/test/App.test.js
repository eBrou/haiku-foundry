import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Route, Switch } from 'react-router-dom';
import App from '../js/components/App';
import Landing from '../js/components/landing';
import Login from '../js/components/login';
import Edit2 from '../js/components/edit2';
import Footer from '../js/components/footer';


describe('<App />', () => {
  it('renders component with class "App"', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.hasClass('App'));
  });

  it('renders correct children', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('main')).to.have.length(1);
    expect(wrapper.find(Switch)).to.have.length(1);
    expect(wrapper.find(Route)).to.have.length(2);
    expect(wrapper.find('RouteWhenAuthorized')).to.have.length(2);
    expect(wrapper.find(Footer)).to.have.length(1);
  });
});
