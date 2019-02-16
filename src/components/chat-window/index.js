import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conversation from '../conversation';
import TextBox from '../text-box';

import './styles.scss';

class ChatWindow extends Component {
  render() {
    const { receiver } = this.props;

    return (
      <div className="chat-window">
        <Conversation {...this.props} />
        <TextBox receiver={receiver} />
      </div>
    );
  }
}

ChatWindow.propTypes = {
  sender: PropTypes.object.isRequired,
  receiver: PropTypes.object.isRequired,
};

export default ChatWindow;