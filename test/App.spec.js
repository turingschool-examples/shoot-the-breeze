import React from 'react'
import { shallow, mount, render } from 'enzyme'
import App from '../lib/components/App'
import { expect } from 'chai'


describe('App', () => {
  it('renders Hello World as a <p>', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.type()).to.eql('p')
  })
  it('has a font family of Cursive', () => {
    const wrapper = shallow(<App />)
    const expectedStyles = {
      fontFamily: 'Helvetica'
    }
    expect(wrapper.prop('style')).eql(expectedStyles)
  })
})
