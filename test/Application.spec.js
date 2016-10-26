import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert } from 'chai'

import Application from '../lib/components/Application'


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
