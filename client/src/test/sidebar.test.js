import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Sidebar } from '../js/components/sidebar';

const savedHaikus = [];

describe('<Sidebar />', () => {
  it('renders a div with class name "sidebar"', () => {
    const wrapper = shallow(<Sidebar savedHaikus={savedHaikus} />);
    expect(wrapper.hasClass('sidebar'));
  });

  it('renders correct children', () => {
    const wrapper = shallow(<Sidebar savedHaikus={savedHaikus} />);
    expect(wrapper.find(RaisedButton)).to.have.length(1);
    expect(wrapper.find(Drawer)).to.have.length(1);
    expect(wrapper.find(AppBar)).to.have.length(1);
  });
});
