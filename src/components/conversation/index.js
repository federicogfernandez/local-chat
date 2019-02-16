import React, { Component } from 'react';
import './styles.scss';

class Conversation extends Component {
  render() {
    const { sender, receiver } = this.props;

    return (
      <div className="conversation">
        <ul className="conversation__list">
          <li className="message">
            <div className="message__avatar">
              <img src={sender.avatar} alt={sender.firstName} />
            </div>
            <div className="content">
              <div className="sender">
                <span className="sender__name">{sender.firstName}</span>
                <span className="sender__time">Today 13:03hs</span>
              </div>
              <div className="content__text">
                <span>Hi ruiz!</span>
              </div>
            </div>
          </li>
          <li className="message">
            <div className="message__avatar">
              <img src={receiver.avatar} alt={receiver.firstName} />
            </div>
            <div className="content">
              <div className="sender">
                <span className="sender__name">{receiver.firstName}</span>
                <span className="sender__time">Today 13:03hs</span>
              </div>
              <div className="content__text">
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Conversation;