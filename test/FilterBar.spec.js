import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert } from 'chai'

import FilterBar from '../lib/components/FilterBar'

const sinon = require('sinon')

describe('Unit Test | FilterBar', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<FilterBar />)
  })
  it('should have an input element with 1 prop', function(){
    const wrapper = render(<FilterBar />)
    assert.equal(wrapper.find('.header').length, 1)
  })
})
