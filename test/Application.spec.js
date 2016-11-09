import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert } from 'chai'

import Application from '../lib/components/Application'

const sinon = require('sinon')

describe('Unit Test | Application', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<Application />)
  })
  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'div')
  })
  it('can call componentDidMount', () => {
    sinon.spy(Application.prototype, 'componentDidMount')
    const wrapper = mount(<Application />)
    assert.equal(Application.prototype.componentDidMount.calledOnce, true)
  })
  it('should have a filter bar with 1 prop', function(){
    const wrapper = render(<Application />)
    assert.equal(wrapper.find('.header').length, 1)
  })
  it('should have a user lisst with 1 prop', function(){
    const wrapper = render(<Application />)
    assert.equal(wrapper.find('.user-list').length, 1)
  })
  it('should have sort buttons with 2 props', function(){
    const wrapper = render(<Application />)
    assert.equal(wrapper.find('.sort-buttons').length, 2)
  })
  it('should have a footer with 1 prop', function(){
    const wrapper = render(<Application />)
    assert.equal(wrapper.find('.footer').length, 1)
  })
  it('renders xml elements', () => {
    sinon.spy(Application.prototype, 'render')
    const wrapper = mount(<Application />)
    assert.equal(Application.prototype.render.calledOnce, true)
  })
})
