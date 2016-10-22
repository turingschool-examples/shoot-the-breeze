import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { pick, map, extend } from 'lodash'

const User = ()
  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapsh


      const Idea = ({id, title, body, active, selectActive, destroy}) => {
        return (
          <div className={active ? 'IdeasListItem is-active' : 'IdeasListItem'}>
            <h3 className='IdeasListItem-title'>{title}</h3>
            <div className='IdeasListItem-body'>{body}</div>
            <div className='IdeasListItem-buttons'>
              <button onClick={()=> destroy(id) }>Destroy</button>
              <button onClick={()=> selectActive(id) }>Active</button>
            </div>
          </div>
        );
      };
