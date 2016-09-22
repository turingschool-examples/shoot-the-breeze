import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import { uniqWith, isEqual, pick, map, extend } from 'lodash';
import Application from '../lib/components/Application';
import MessageList from '../lib/components/Application';
import MessageInput from '../lib/components/Application';
import ActionButton from '../lib/components/ActionButton';
import SortHeader from '../lib/components/SortHeader';
import UserList from '../lib/components/UserList';

let message1 =    {
  key: '-KSAMLo5iSmClrZSPFXv',
  content:  'hello',
  createdAt:  1,
  user: {
    displayName: 'Brett Hevia' ,
    email: 'brett.hevia@gmail.com',
    uid: 'eDnoVr1f5OZlySEszpbYSI2IcxG3'
  }
}

let message2 =  {
  key: '-KS9Mid4HGVWZxqxn4OQ',
  content:  'goodbye',
  createdAt:  99,
  user: {
    displayName: 'Brett Hevia' ,
    email: 'Brett.Hevia@gmail.com',
    uid: 'eDnoVr1f5OZlySEszpbYSI2IcxG2'
  }
}

let messages = [ message1, message2 ]


describe('Application', () => {
  context('mount', function() {

    const wrapper = mount(<Application/>);
    wrapper.state().messages = messages;
    wrapper.state.user = message1.user;

    it('should have a message array in its message state', function() {
      assert.equal(wrapper.state().messages.length, 2);
    })

    it('should have a user', function() {
      assert.deepEqual(wrapper.state.user, message1.user)
    })

    it('should have a message list and message input component', function() {
      expect(wrapper.find(MessageList)).to.have.length(1);
      expect(wrapper.find(MessageInput)).to.have.length(1);
    })

    it('should display a logged in message', function() {
      expect(wrapper.find('.login-button')).to.have.length(1)
    })
  })
});

describe('MessageInput', function() {
  context('mount', function() {

    const wrapper = mount(<MessageInput/>)
    wrapper.props.user = message1.user;

    it('should have been passed a user prop', function() {
      assert.equal(wrapper.props.user, message1.user)
      console.log(wrapper.state)
    })
    it('should have two action button components and an input field', function() {
      expect(wrapper.find(ActionButton)).to.have.length(2);
      expect(wrapper.find('.message-input-field')).to.have.length(1);
    })
    // it('should update draftMessage state when input is changed', function (){
    //   wrapper.find('.message-input-field').simulate('keydown', { which: 'b'})
    //   expect(wrapper.state.draftMessage).to.equal('b')
    // })
    it('should clear input field when clear button is pressed', function() {
      wrapper.find('.message-input-field').simulate('keydown', { which: 'b'});
      expect(wrapper.text('.message-input-field')).to.contain('b');
      wrapper.find('.clear-button').simulate('click');
      expect(wrapper.text('.message-input-field')).to.contain('');
    })
    it('should clear input field when send button is pressed', function() {
      wrapper.find('.message-input-field').simulate('keydown', { which: 'b'});
      expect(wrapper.text('.message-input-field')).to.contain('b');
      wrapper.find('.submit-button').simulate('click');
      expect(wrapper.text('.message-input-field')).to.contain('');
    })
  })
})

describe('MessageList', function() {
  context('mount', function() {
    const wrapper = mount(<MessageList messages={messages}/>)
    wrapper.setState({ messages: messages })
    it('should have a SortHeader, message-list-ul, and UserList rendered', function() {
      expect(wrapper.find(SortHeader)).to.have.length(1);
      expect(wrapper.find('.message-list-ul')).to.have.length(1);
      expect(wrapper.find(UserList)).to.have.length(1);
    })
    it('should be displaying two message li items', function() {
      expect(wrapper.find('.message-ul-js')).to.have.length(2);
    })
  })
})

describe('UserList', function() {
  context('mount', function() {
    const wrapper = mount(<UserList messages={messages}/>)
    it('should have a user-list element, and a user-list-title element', function() {
      expect(wrapper.find('.user-list')).to.have.length(1);
      expect(wrapper.find('.user-list-title')).to.have.length(1);
    })

  })
})

describe('UserList', function() {
  context('mount', function() {
    const wrapper = mount(<UserList/>)
      it('should have render a user-list element and a user-list-title element', function() {
        expect(wrapper.find('.user-list')).to.have.length(1);
        expect(wrapper.find('.user-list-title')).to.have.length(1);
      })
  })
})
