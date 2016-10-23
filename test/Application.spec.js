import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import moment from 'moment';

import Application from '../lib/components/Application';
import InputForm from '../lib/components/InputForm';
import FilterMessages from '../lib/components/FilterMessages';
import DisplayMessages from '../lib/components/DisplayMessages';

describe('Application', () => {
  it('renders as a <section>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'section');
  });

  it('renders a message on the page on click of submit button',() =>{
    const wrapper = mount(<InputForm />);
    const input = wrapper.find('#message-input');

    input.simulate('change', {targer: {value: 'hello world'}});
    wrapper.find('.submit-btn').simulate('click');
    expect(wrapper.text().to.equal('hello world'));
  });


});
