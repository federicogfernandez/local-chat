import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Picker } from 'emoji-mart';
import Trigger from 'rc-trigger';
import Messages from '../../services/messages';

import './styles.scss';

class TextBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastTyping: 0,
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onEmojiSelect = this.onEmojiSelect.bind(this);
    this.sendTypingEvent = debounce(this.sendTypingEvent.bind(this), 600, {
      leading: true,
    });

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

  sendTypingEvent() {
    const { user, conversation } = this.props;

    this.setState({
      lastTyping: Date.now(),
    });

    Messages.send({
      sender: user.id,
      conversation: conversation.id,
      content: {
        type: 'event',
        value: `${user.name} is typing...`,
      },
    });
  }

  onKeyPress(e) {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
    }

    const { lastTyping } = this.state;

    if(lastTyping === 0 || Date.now() - lastTyping > 3000) {
      this.sendTypingEvent();
    }
  }

  onKeyUp(e) {
    if (!e.shiftKey && e.key === 'Enter') {
      const box = this.box.current;

      this.setState({
        lastTyping: 0,
      });

      this.sendMessage(box.innerHTML);

      box.innerHTML = null;
    }
  }

  onEmojiSelect(emoji) {
    const box = this.box.current;

    box.innerHTML = box.innerHTML + emoji.native;
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
          <Trigger
            action={['click']}
            popup={
              <Picker native onSelect={this.onEmojiSelect} />
            }
            popupAlign={{
              points: ['br', 'tr'],
              offset: [-5, 0]
            }}
          >
            <button className="actions__emoji" onClick={this.toggleEmojiSelector}>
              <img src="/icons/emoji-button.svg" alt="Send" />
            </button>
          </Trigger>
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