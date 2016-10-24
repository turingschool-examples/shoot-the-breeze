import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import ClearInput from '../lib/components/clear-input';

describe('ClearInput', () => {

  it('renders a button on the page', () => {
    const wrapper = shallow(<ClearInput />);
    assert.equal(wrapper.type(), 'button');
  });

});
