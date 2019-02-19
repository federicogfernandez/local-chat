import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './styles.scss';

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.component = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const component = this.component.current;
    component.scrollTop = component.scrollHeight;
  }

  render() {
    const { conversation } = this.props;

    return (
      <div className="conversation" ref={this.component}>
        <ul className="conversation__list">
          {conversation.messages && conversation.messages.map((message) => (
            <li className="message" key={message.id}>
              <div className="message__avatar">
                <img src={message.sender.avatar} alt={message.sender.name} />
              </div>
              <div className="content">
                <div className="sender">
                  <span className="sender__name">{message.sender.name}</span>
                  <span className="sender__time">{moment(message.timestamp).fromNow()}</span>
                </div>
                <div className="content__text">
                  <span dangerouslySetInnerHTML={{ __html: message.content.value }}></span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  conversationName: PropTypes.string.isRequired,
};

export default Conversation;