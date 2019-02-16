import React, { Component } from 'react';
import ChatWindow from './components/chat-window';
import './App.scss';

const user1 = {
  id: 1,
  username: 'laura',
  firstName: 'Laura',
  avatar: '/images/laura.jpg',
};

const user2 = {
  id: 2,
  username: 'rob',
  firstName: 'Rob',
  avatar: '/images/robert.jpg',
};

class App extends Component {
  render() {
    return (
      <div className="chat">
        <ChatWindow sender={user1} receiver={user2} />
        <ChatWindow sender={user2} receiver={user1} />
      </div>
    );
  }
}

export default App;
