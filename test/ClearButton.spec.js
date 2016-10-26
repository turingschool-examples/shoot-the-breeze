import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'

import MessageInput from '../lib/components/MessageInput'
import { ClearButton } from '../lib/components/ClearButton'

const sinon = require('sinon')

describe('Unit Test | ClearButton', () => {
  it('can mount with no properties', () => {
  const wrapper = shallow(<ClearButton />)
  })
  it('should have a button with 1 prop', function(){
    const wrapper = render(<ClearButton />)
    assert.equal(wrapper.find('.clear-button').length, 1)
  })
  it('should have the button text rendered onto the page', function(){
    const wrapper = render(<ClearButton/>)
    expect(wrapper.text()).to.contain('Clear')
  })
})
describe('Feature Test | ClearButton', () => {
  it('clears the message input text', () => {
    const onButtonClick = sinon.spy()
    const wrapper = shallow(
      <ClearButton onClick={onButtonClick} />)
    const wrapper2 = shallow(
      <MessageInput />)
    wrapper.find('.clear-button').simulate('click')
    expect(wrapper2.state('draftMessage')).to.eq('')
  })
})
