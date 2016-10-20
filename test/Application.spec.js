import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import Application from '../lib/components/Application';
import MessageInput from '../lib/components/MessageInput';

describe('Unit Test | Application', () => {
  it('can count with no properties', () => {
    const wrapper = shallow(<Application />)
  });
  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'div');
  });
  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'div');
  });
});

describe('Unit Test | MessageInput', () => {
  it('can count with no properties', () => {
    const wrapper = shallow(<MessageInput />)
  });
  it('renders as a <form>', () => {
    const wrapper = shallow(<MessageInput />)
    assert.equal(wrapper.type(), 'form');
  });
});

describe('Feature Test | MessageInput', () => {
  it('can render a message when it is submitted', () => {
    const wrapper = mount(<Application />)
    const messageInput = wrapper.find('.MessageInput')

    messageInput.simulate('change', {target: {value: 'goodmorning'} })
    wrapper.find('.SubmitButton').simulate('click')
    setTimeout(() => {
      expect(wrapper.text()).to.equal('goodmorning')
    }, 3000)
  });
});
