import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import Application from '../lib/components/Application';
import MessageInput from '../lib/components/MessageInput';

describe('Unit Test | Application', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<Application />)
  });
  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'div');
  });
});

describe('Unit Test | MessageInput', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<MessageInput />)
  });
  it('renders a "SubmitButton"', () => {
    const wrapper = mount(<MessageInput />)
    expect(wrapper.find('.SubmitButton')).to.have.length(1)
  });
  it('renders a "ClearButton"', () => {
    const wrapper = shallow(<MessageInput />)
    expect(wrapper.find('.ClearButton')).to.have.length(1)
  });
  it('renders as a <form>', () => {
    const wrapper = shallow(<MessageInput />)
    assert.equal(wrapper.type(), 'form');
  });
});

describe('Feature Test | MessageInput', () => {
  it('should change the "draftMessage" state with new user input', () => {
    const wrapper = mount(<MessageInput />);
    const input = wrapper.find('.MessageInput');

    input.simulate('change', {target: {value: 'how you doin?!'} });
    expect(wrapper.state('draftMessage')).to.equal('how you doin?!');
  });
  it('can render a message when "SubmitButton" is clicked"', () => {
    const wrapper = mount(<Application />)
    const messageInput = wrapper.find('.MessageInput')

    messageInput.simulate('change', {target: {value: 'goodmorning'} })
    wrapper.find('.SubmitButton').simulate('click')
    setTimeout(() => {
      expect(wrapper.text()).to.equal('goodmorning')
    }, 3000)
  });
});
