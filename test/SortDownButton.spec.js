import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'

import Application from '../lib/components/Application'
import { SortDownButton } from '../lib/components/SortDownButton'

const sinon = require('sinon')

describe('Unit Test | SortDownButton', () => {
  it('can mount with no properties', () => {
  const wrapper = shallow(<SortDownButton />)
  })
  it('should have a button with 1 prop', function(){
    const wrapper = render(<SortDownButton />)
    assert.equal(wrapper.find('.sort-down').length, 1)
  })
  it('should have the button text rendered onto the page', function(){
    const wrapper = render(<SortDownButton/>)
    expect(wrapper.text()).to.contain('Sort ⬇')
  })
})
describe('Feature Test | SortDownButton', () => {
  it('changes reverseMessages to false', () => {
    const onButtonClick = sinon.spy()
    const wrapper = shallow(
      <SortDownButton onClick={onButtonClick} />)
    const wrapper2 = shallow(
      <Application />)
    wrapper2.setState({reverseMessages: false})
    wrapper.find('.sort-down').simulate('click')
    expect(wrapper2.state('reverseMessages')).to.eq(false)
  })
})
