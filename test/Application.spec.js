import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert } from 'chai'

let sinon = require('sinon')

import Application from '../lib/components/Application'
import MessageInput from '../lib/components/MessageInput'


describe('Unit Test | Application', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<Application />)
  })
  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'div')
  })

  // it('should render the org name', () => {
  //   const wrapper = shallow(<Application />)
  //   assert.equal(wrapper.contains('turingschool')).to.be.true
  // })
})

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



// console.log(wrapper.debug())

//
// describe('app.jsx renders the likes counter',function(){
//   it('should render the application',function(){
//
//     const wrapper = shallow(<App/>)
//
//     expect(wrapper.contains(<LikesCounter initialCount={0} />)).to.be.true
//     expect(wrapper.props()).to.deep.equal({ initialCount: 0 })
//   })
//
//
//   it('should have the button text rendered onto the page', function(){
//     const wrapper = render(<App/>)
//     expect(wrapper.text()).to.contain('Likes: 0Like! (+1)Dislike! (-1)')
//   })
// })



// describe('likes counter',function(){
//   it('should have 2 action button props', function(){
//     const wrapper = render(<LikesCounter/>)
//     expect(wrapper.find('.ActionButton')).to.have.length(2)
//   })
//
//   it('should allow me to click the action button', function(){
//     const wrapper = mount(<LikesCounter/>)
//     wrapper.state().count = 0 // we must do this because this value isn't set initially
//     var button = wrapper.find('#like').simulate('click')
//
//     expect(wrapper.state().count).to.equal(1)
//   })
// })
