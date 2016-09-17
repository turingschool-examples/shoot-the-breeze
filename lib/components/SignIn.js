import React, { Component } from 'react';
import firebase, { signIn } from '../firebase';


export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  render() {
    const {user} = this.state;
    if (user) {
      return(
        <section className='user-info'>
          <article className='user-info-text-block'>
            <p>Logged in as {user.displayName} ({user.email}).</p>
          </article>
        </section>
      )
    }
    return(
      <section className='sign-in'>
        <button className='sign-in-button' onClick={() => signIn()}>Log in</button>
      </section>
    );
  }
}
