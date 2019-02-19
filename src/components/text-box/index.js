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
    const { user, conversation } = this.props;

    Messages.send({
      sender: user.id,
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

  render() {
    const { headerData } = this.props;

    return (
      <div className="text-box">
        <div 
          className="text-box__box"
          placeholder={`Write a message to ${headerData.name}`}
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
  user: PropTypes.object.isRequired,
  conversation: PropTypes.object.isRequired,
  headerData: PropTypes.object.isRequired,
};

export default TextBox;