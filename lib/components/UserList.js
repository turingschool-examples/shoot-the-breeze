import React, { Component } from 'react';
import Application from './Application';
import { uniqWith, map, isEqual } from 'lodash';

class UserList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const usersArray = [];
    map(this.props.messages, (message) => usersArray.push(message.user))
    const uniqueUsers = (_.uniqWith(usersArray, _.isEqual))
    console.log(uniqueUsers)

    return(
      <ul>
        { uniqueUsers.map(u => <li key={u.uid}>{u.displayName} ({u.email}) </li>) }
      </ul>
    )
  }
}

export default UserList;

//  getUniq(){
  //   var messageArray = this.props.messages.map(m => {m.user.displayName} ({ m.user.email }) );
  //   return _.uniq(messageArray);
  // }
//   constructor(props) {
//     super(props)
//   }
//
//   getUniq(){
//     var messageArray = this.props.messages.map(m => {m.user.displayName} ({ m.user.email }) );
//     return _.uniq(messageArray);
//   }
//
//   render() {
//     return(
//       <ul>
//         { this.getUniq().map(m => <li> { m } </li>) }
//       </ul>
//     )
//   }
// }
