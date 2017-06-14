import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Login } from '../js/components/login';
import Header from '../js/components/header';


describe('<Login />', () => {
  it('renders a div with class name "login"', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.hasClass('login'));
  });

  it('renders correct children', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(Header)).to.have.length(1);
    expect(wrapper.find('h1')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal('Login or sign up to get started ');
    expect(wrapper.find('div.loginWrapper')).to.have.length(1);
    expect(wrapper.find('img')).to.have.length(1);
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('form').children()).to.have.length(4);
    expect(wrapper.find(TextField)).to.have.length(2);
    expect(wrapper.find(RaisedButton)).to.have.length(2);
    expect(wrapper.find(FlatButton)).to.have.length(1);
  });
});
