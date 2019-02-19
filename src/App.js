import React, { Component } from 'react';
import ChatWindow from './components/chat-window';
import './App.scss';

// HARDCODED USER IDS
const LAURA = 1;
const ROB = 2;
const CONVERSATION = 1;

class App extends Component {
  render() {
    return (
      <div className="chat">
        <ChatWindow userId={LAURA} conversationId={CONVERSATION} />
        <ChatWindow userId={ROB} conversationId={CONVERSATION} />
      </div>
    );
  }
}

export default App;
