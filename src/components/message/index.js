import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Dots from '../dots';

import './styles.scss';

class Message extends Component {
  render() {
    const { message } = this.props;

    return (
      <li className="message">
        {message.content.type === 'text' &&
          <Fragment>
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
          </Fragment>
        }
        {message.content.type === 'event' && message.content.value === 'typing' &&
          <Fragment>
            <div className="message__avatar">
              <img src={message.sender.avatar} alt={message.sender.name} />
            </div>
            <div className="content">
              <Dots />
            </div>
          </Fragment>
        }
      </li>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;