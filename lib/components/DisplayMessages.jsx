import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';

// export default class DisplayMessages extends Component {

  // if(filteredMessages > 0){
  //   let messages = filteredMessages;
  // }else{
  //   return messages;
  // }

//   render(){
//   return(
//     <ul className='message-field'>
//       {messages.map(m =>{
//         return (
//           <li className='single-message' key={m.key}>
//             <span className = 'timestamp'>{m.createdAt}</span>
//             <span className = 'username'>{m.user.displayName}</span>
//             <br/>
//             <span className= 'message-content'>{m.content}</span>
//           </li>
//         );
//       })
//     }
//     </ul>
//     );
//   }
// }

const DisplayMessages = ({messages, filteredMessages})=>{
//
//     if(filteredMessages > 0){
//       let messages = filteredMessages;
//     }else{
//       return messages;
//     }
//
//
    return(
      <ul className='message-field'>
        {messages.map(m =>{
          return (
            <li className='single-message' key={m.key}>
              <span className = 'timestamp'>{m.createdAt}</span>
              <span className = 'username'>{m.user.displayName}</span>
              <br/>
              <span className= 'message-content'>{m.content}</span>
            </li>
          );
        })
      }
      </ul>
    );
  }

module.exports = DisplayMessages;
