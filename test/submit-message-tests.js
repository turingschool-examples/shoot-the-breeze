import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import SubmitMessage from '../lib/components/submit-message';

describe('SubmitMessage', () => {

  it('renders a button on the page', () => {
    const wrapper = shallow(<SubmitMessage />);
    assert.equal(wrapper.type(), 'button');
  });

});
