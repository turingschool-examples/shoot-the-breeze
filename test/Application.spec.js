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

  it('has a presentUsers state that is an array', () => {
    const wrapper = shallow(<Application />);
    assert.deepEqual(wrapper.state().presentUsers, []);
  });

  it('has a new message that is set to an empty string by default', () => {
    const wrapper = shallow(<Application />);
    assert.equal(wrapper.state().newMessage, '');

  });

  it('has a user that is set to an empty string by default', () => {
    const wrapper = shallow(<Application />);
    assert.equal(wrapper.state().user, '');
  });

  it('has a state that disables the submit button by default', () => {
    const wrapper = shallow(<Application />);
    assert.equal(wrapper.state().submitButtonDisabled, true);
  });

  it('has a state that disables the clear button by default', () => {
    const wrapper = shallow(<Application />);
    assert.equal(wrapper.state().clearButtonDisabled, true);
  });

  it('has a function called clearInputField() that clears the input field', () => {
    const wrapper = mount(<Application />);
    wrapper.clearInputField();
    assert.equal(wrapper.state().newMessage, '');
  });

});
