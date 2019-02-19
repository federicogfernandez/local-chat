import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './styles.scss';

class Conversation extends Component {
  render() {
    const { conversation } = this.props;

    return (
      <div className="conversation">
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
  userId: PropTypes.number.isRequired,
  conversation: PropTypes.object.isRequired,
};

export default Conversation;