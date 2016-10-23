import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import moment from 'moment';

import Application from '../lib/components/Application';
import InputForm from '../lib/components/InputForm';
import FilterMessages from '../lib/components/FilterMessages';
import DisplayMessages from '../lib/components/DisplayMessages';

describe('Application', () => {
  it('renders as a <section>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'section');
  });

  it('renders a message on the page on click of submit button',() =>{
    const wrapper = mount(<Application />);
    const input = wrapper.find('#message-input');
    const submit = wrapper.find('.submit-btn');

    input.simulate('change', {target: {value: 'hello world'}});
    submit.simulate('click');
    setTimeout(() => {
      expect(wrapper.text()).to.equal('hello world');
    }, 1000);
  });

  it('should clear the input field is clear is clicked', () =>{
    const wrapper = mount(<Application />);
    const input = wrapper.find('#message-input');
    const clear = wrapper.find('.clear-btn');

    input.simulate('change', {target: {value: 'hello world'}});
    expect(wrapper.state('draftMessage')).to.equal('hello world');

    clear.simulate('click');
    expect(wrapper.state('draftMessage')).to.equal('');
  });

});
