import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Messages from '../../services/messages';

import './styles.scss';

class TextBox extends Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.box = React.createRef();
  }

  sendMessage(message) {
    const { userId, conversation } = this.props;

    Messages.send({
      sender: userId,
      conversation: conversation.id,
      content: {
        type: 'text',
        value: message,
      },
    });
  }

  onKeyPress(e) {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
    }
  }

  onKeyUp(e) {
    if (!e.shiftKey && e.key === 'Enter') {
      const box = this.box.current;

      this.sendMessage(box.innerHTML);

      box.innerHTML = null;
    }
  }

  getConversationName() {
    const { conversation, userId } = this.props;

    if(conversation.participants.length > 2) {
      return conversation.name;
    }

    return conversation.participants.find((user) => user.id !== userId).name;
  }

  render() {
    const name = this.getConversationName();

    return (
      <div className="text-box">
        <div 
          className="text-box__box"
          placeholder={`Write a message to ${name}`}
          onKeyUp={this.onKeyUp}
          onKeyPress={this.onKeyPress}
          ref={this.box}
          contentEditable
        ></div>
        <div className="actions">
          <button className="actions__send" onClick={this.sendMessage}>
            <img src="/icons/send-button.svg" alt="Send" />
          </button>
        </div>
      </div>
    );
  }
}

TextBox.propTypes = {
  userId: PropTypes.number.isRequired,
  conversation: PropTypes.object.isRequired,
};

export default TextBox;