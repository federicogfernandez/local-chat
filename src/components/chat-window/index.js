import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conversations from '../../services/conversations';
import Users from '../../services/users';
import Header from '../header';
import Conversation from '../conversation';
import ConversationHeader from '../conversation-header';
import TextBox from '../text-box';

import './styles.scss';

class ChatWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversation: null,
      headerData: null,
    };
  }

  componentWillMount() {
    this.getConversation();
    this.getUser();
  }

  componentDidMount() {
    this.listenForNewMessages();
  }

  getConversation() {
    const { conversationId } = this.props;

    Conversations
      .getById(conversationId)
      .then((conversation) => {
        this.setState({
          conversation,
          headerData: this.getConversationHeaderData(conversation),
        });
      })
      .catch(console.log);
  }

  getUser() {
    const { userId } = this.props;

    Users
      .getById(userId)
      .then((user) => {
        this.setState({
          user,
        });
      })
      .catch(console.log);
  }

  getConversationHeaderData(conversation) {
    const { userId } = this.props;

    if (conversation.participants.length > 2) {
      const { name, avatar } = conversation;

      return {
        name,
        avatar,
      };
    }

    const { name, avatar } = conversation.participants.find((participant) => participant.id !== userId);
    
    return {
      name,
      avatar,
    };
  }

  listenForNewMessages() {
    navigator.serviceWorker.addEventListener('message', event => {
      const { userId } = this.props;
      const { conversation } = this.state;
      const message = JSON.parse(event.data);
      
      if (message.content.type !== 'event' || (message.content.type === 'event' && message.sender.id !== userId)) {
        conversation.messages = conversation.messages.filter((message) => message.content.type !== 'event');

        conversation.messages.push(message);

        this.setState({
          conversation,
        });

        clearInterval(this.clearEvents);

        if (message.content.type === 'event') {
          this.startClearEvents();
        }
      }
    });
  }

  startClearEvents() {
    const time = 3000;

    this.clearEvents = setInterval(() => {
      const { conversation } = this.state;
      const event = conversation.messages.find((message) => message.content.type === 'event');

      if (event !== -1 && Date.now() - event.timestamp > time) {
        clearInterval(this.clearEvents);

        this.deleteEvents();
      }
    }, time);
  }

  deleteEvents() {
    const { conversation } = this.state;

    conversation.messages = conversation.messages.filter((message) => message.content.type !== 'event');

    this.setState({
      conversation,
    });
  }

  render() {
    const { conversation, user, headerData } = this.state;

    return (
      <div className="chat-window">
        {user && <Header user={user} />}
        {headerData && <ConversationHeader headerData={headerData} />}
        {conversation && user && <Conversation user={user} conversation={conversation} headerData={headerData} />}
        {conversation && user && <TextBox user={user} conversation={conversation} headerData={headerData} />}
      </div>
    );
  }
}

ChatWindow.propTypes = {
  userId: PropTypes.number.isRequired,
  conversationId: PropTypes.number.isRequired,
};

export default ChatWindow;