import React from 'react';
// import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { BrowserRouter as Router, Route, Match, Redirect, Switch, Link } from 'react-router-dom';
import App from '../js/components/App';
import Landing from '../js/components/landing';
import Login from '../js/components/login';
import Edit2 from '../js/components/edit2';
import Footer from '../js/components/footer';
import Home from '../js/components/home';


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

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
