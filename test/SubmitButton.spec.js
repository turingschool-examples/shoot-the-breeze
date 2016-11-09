import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'

import MessageInput from '../lib/components/MessageInput'
import { SubmitButton } from '../lib/components/SubmitButton'

const sinon = require('sinon')

describe('Unit Test | SubmitButton', () => {
  it('can mount with no properties', () => {
  const wrapper = shallow(<SubmitButton />)
  })
  it('should have a button with 1 prop', function(){
    const wrapper = render(<SubmitButton />)
    assert.equal(wrapper.find('.submit-button').length, 1)
  })
  it('should have the button text rendered onto the page', function(){
    const wrapper = render(<SubmitButton/>)
    expect(wrapper.text()).to.contain('Submit')
  })
})
describe('Feature Test | SubmitButton', () => {
  it('submits a message', () => {
    const onButtonClick = sinon.spy()
    const wrapper = shallow(
      <SubmitButton onClick={onButtonClick} />)
    const wrapper2 = shallow(
      <MessageInput />)
    wrapper.find('.submit-button').simulate('click')
    expect(wrapper2.state('draftMessage')).to.eq('')
  })
})
