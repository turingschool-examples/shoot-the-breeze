import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import LogInButton from '../lib/components/login-button';

describe('LogInButton', () => {

  it('renders a button on the page', () => {
    const wrapper = shallow(<LogInButton />);
    assert.equal(wrapper.type(), 'button');
  });

});
