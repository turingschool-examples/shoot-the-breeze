<<<<<<< HEAD
import React, { Component } from 'react';

export default class MessageInput extends Component {
  render() {
    return (
      <section>
        <input
          placeholder="Message"
          className="message-input"
          onChange={this.props.handleMessageInput}
        />
      </section>
    )
  }
}
=======
// import React, { Component } from 'react';
//
// export default class MessageInput extends Component {
//   render() {
//     return (
//       <section>
//         <input
//           placeholder="Message"
//           className="message-input"
//           onChange={this.props.handleMessageInput}
//         />
//       </section>
//     )
//   }
// }


{/* <MessageInput handleMessageInput={this.handleMessageInput}/> */}


// handleMessageInput(e) {
//   const inputValue = e.target.value;
//   this.setState({ draftMessage: inputValue });
// }


// this.handleMessageInput = his.handleMessageInput.bind(this);
>>>>>>> master
