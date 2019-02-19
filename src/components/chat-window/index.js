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
    navigator.serviceWorker.addEventListener('message', event => {
      const { conversation } = this.state;
      const data = JSON.parse(event.data);

      this.transformMessage(data)
        .then((message) => {
          conversation.messages.push(message);

          this.setState({
            conversation,
          });
        })
        .catch(console.log);  

      this.setState({
        conversation,
      });
    });
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

  transformMessage(message) {
    return Users
      .getById(message.sender)
      .then((user) => {
        message.sender = user;

        return message;
      });
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