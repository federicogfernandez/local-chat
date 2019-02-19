import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conversations from '../../services/conversations';
import Users from '../../services/users';
import Conversation from '../conversation';
import TextBox from '../text-box';

import './styles.scss';

class ChatWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversation: null,
    };
  }

  componentWillMount() {
    const { conversationId } = this.props;

    Conversations
      .getById(conversationId)
      .then((conversation) => {
        this.setState({
          conversation,
        });
      })
      .catch(console.log);
  }

  componentDidMount() {
    navigator.serviceWorker.addEventListener('message', event => {
      const { conversation } = this.state;

      this.transformMessage(event.data)
        .then((message) => {
          conversation.messages.push(message);
        })
        .catch(console.log);  

      this.setState({
        conversation,
      });
    });
  }

  transformMessage(message) {
    return Users
      .getById(message.sender)
      .then((user) => {
        message.sender = user;

        return message;
      });
  }

  render() {
    const { userId } = this.props;
    const { conversation } = this.state;

    return (
      <div className="chat-window">
        {conversation && <Conversation userId={userId} conversation={conversation} />}
        {conversation && <TextBox userId={userId} conversation={conversation} />}
      </div>
    );
  }
}

ChatWindow.propTypes = {
  userId: PropTypes.number.isRequired,
  conversationId: PropTypes.number.isRequired,
};

export default ChatWindow;