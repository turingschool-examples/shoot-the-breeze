import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
let sinon = require('sinon');
import DisplayMessages from '../lib/components/DisplayMessages';


describe('DisplayMessages', () => {
  it('renders as a <ul>', () => {
    const wrapper = shallow(<DisplayMessages />)
    assert.equal(wrapper.type(), 'ul');
  });
});
