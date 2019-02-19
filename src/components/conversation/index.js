import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from '../message';
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
            <Message message={message} key={message.id || Date.now()} />
          ))}
        </ul>
      </div>
    );
  }
}

Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default Conversation;