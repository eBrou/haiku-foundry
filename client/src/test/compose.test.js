import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { BrowserRouter as Router, Route, Match, Redirect, Switch, Link } from 'react-router-dom';
import { Compose } from '../js/components/Compose';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import ContentEditable from 'react-contenteditable';

describe('<Compose />', () => {
  it('renders component with class "compose"', () => {
    const wrapper = shallow(<Compose />);
    expect(wrapper.hasClass('compose'));
  });

  it('renders correct children', () => {
    const wrapper = shallow(<Compose />);
    expect(wrapper.find('div.sub-header')).to.have.length(1);
    expect(wrapper.find('img')).to.have.length(1);
    expect(wrapper.find('div.question-div')).to.have.length(1);
    expect(wrapper.find(IconButton)).to.have.length(1);
    expect(wrapper.find(Dialog)).to.have.length(3);
    expect(wrapper.find('div.input-div-containers')).to.have.length(3);
    expect(wrapper.find('div.input-div-containers').children()).to.have.length(6);
    expect(wrapper.find('.input-div-containers'));
    expect(wrapper.find(ContentEditable)).to.have.length(3);
    expect(wrapper.find('div.button-wrapper-1')).to.have.length(1);
    expect(wrapper.find('div.button-wrapper-2')).to.have.length(1);
    expect(wrapper.find(RaisedButton)).to.have.length(1);
  });

});
