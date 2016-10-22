import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import LogOutButton from '../lib/components/logout-button';

describe('LogOutButton', () => {

  it('renders a button on the page', () => {
    const wrapper = shallow(<LogOutButton />);
    assert.equal(wrapper.type(), 'button');
  });

});
