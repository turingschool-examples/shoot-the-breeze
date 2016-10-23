import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import moment from 'moment';
//
export default class FilterMessages extends Component {
//
//   filter(mesages){
//     this.focus = this.focus.bind(this);
//   }
//
  render(){
//     const {user, messages} = this.props;
//
//     const focus =
//       this.messages.filter();
//     }
//
    return (
      <div className = "filter-bar">
        <span>Shoot the Breeze</span>
        <input id = "filter-input"
          placeholder="Filter"
//           onChange=this.focus
        />
      </div>
    );
  }
}
