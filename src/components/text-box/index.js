import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class TextBox extends Component {
  render() {
    const { receiver } = this.props;

    return (
      <div className="text-box">
        <div className="text-box__box" placeholder={`Write a message to ${receiver.firstName}`} contentEditable></div>
        <div className="actions">
          <button className="actions__send">
            <img src="/icons/send-button.svg" alt="Send" />
          </button>
        </div>
      </div>
    );
  }
}

TextBox.propTypes = {
  receiver: PropTypes.object.isRequired,
};

export default TextBox;