import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'

import Application from '../lib/components/Application'
import { SortUpButton } from '../lib/components/SortUpButton'

const sinon = require('sinon')

describe('Unit Test | SortUpButton', () => {
  it('can mount with no properties', () => {
  const wrapper = shallow(<SortUpButton />)
  })
  it('should have a button with 1 prop', function(){
    const wrapper = render(<SortUpButton />)
    assert.equal(wrapper.find('.sort-up').length, 1)
  })
  it('should have the button text rendered onto the page', function(){
    const wrapper = render(<SortUpButton/>)
    expect(wrapper.text()).to.contain('Sort ⬆')
  })
})
describe('Feature Test | SortUpButton', () => {
  it('changes reverseMessages to true', () => {
    const onButtonClick = sinon.spy()
    const wrapper = shallow(
      <SortUpButton onClick={onButtonClick} />)
    const wrapper2 = shallow(
      <Application />)
    wrapper2.setState({reverseMessages: true})
    wrapper.find('.sort-up').simulate('click')
    expect(wrapper2.state('reverseMessages')).to.eq(true)
  })
})
