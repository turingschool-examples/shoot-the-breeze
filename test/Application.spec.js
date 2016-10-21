import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import Application from '../lib/components/Application';

describe('Application', () => {

  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'div');
  });

  it('has a messages state that is an array', () => {
    const wrapper = shallow(<Application />);
    assert.deepEqual(wrapper.state().messages, []);
  });

  it('has a new message that is set to an empty string by default', () => {
    const wrapper = shallow(<Application />);
    assert.equal(wrapper.state().newMessage, '');

  });

  it('has a user that is set to an empty string by default', () => {
    const wrapper = shallow(<Application />);
    assert.equal(wrapper.state().user, '');
  });


});
