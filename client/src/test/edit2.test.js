import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { BrowserRouter as Router, Route, Match, Redirect, Switch, Link } from 'react-router-dom';
import { Edit2 } from '../js/components/edit2';
import Header  from '../js/components/header';
import Compose from '../js/components/compose';
import IconButton from 'material-ui/IconButton';
// import RaisedButton from 'material-ui/RaisedButton';

// import ContentEditable from 'react-contenteditable';

describe('<Edit2 />', () => {
  it('renders component with class "edit-component"', () => {
    const wrapper = shallow(<Edit2 haikuText=""/>);
    expect(wrapper.hasClass('edit-component'));
  });

  it('renders correct children', () => {
    const wrapper = shallow(<Edit2 haikuText="test"/>);
    expect(wrapper.find('div.edit-component').children()).to.have.length(2);
    expect(wrapper.find(Header)).to.have.length(1);
    expect(wrapper.find(Compose)).to.have.length(1);
  });

});
