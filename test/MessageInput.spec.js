import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert } from 'chai'

import MessageInput from '../lib/components/MessageInput'

describe('Unit Test | MessageInput', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<MessageInput />)
  })
  // it('calls componentDidMount', () => {
  //   sinon.spy(MessageInput.prototype, 'componentDidMount')
  //   const wrapper = mount(<MessageInput />)
  //   expect(MessageInput.prototype.componentDidMount.calledOnce).to.equal(true)
  // })
  it('renders a "submit-button"', () => {
    const wrapper = mount(<MessageInput />)
    assert(wrapper.find('.submit-button'))
  })
  it('renders a "clear-button"', () => {
    const wrapper = shallow(<MessageInput />)
    assert(wrapper.find('.clear-button'))
  })
  it('renders as a <form>', () => {
    const wrapper = shallow(<MessageInput />)
    assert.equal(wrapper.type(), 'form')
  })
// ________
  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy()
  //   const wrapper = shallow(<MessageInput />)
  // })
  //
  //
})

describe('Feature Test | MessageInput', () => {
  it('should change the "draftMessage" state with new user input', () => {
    const wrapper = mount(<MessageInput />)
    const messageInput = wrapper.find('.message-input-form')

    messageInput.simulate('change', {target: {value: 'how you doin?!'} })
    setTimeout(() => {
      assert.equal(wrapper.state('draftMessage'), ('how you doin?!'))
    }, 1)
  })
  it('can render a message when "submit-button" is clicked"', () => {
    const wrapper = mount(<Application />)
    const messageInput = wrapper.find('.message-input-form')

    messageInput.simulate('change', {target: {value: 'goodmorning'} })
    wrapper.find('.submit-button').simulate('click')
    setTimeout(() => {
      assert.equal(wrapper.text(), ('goodmorning'))
    }, 1)
  })
})
