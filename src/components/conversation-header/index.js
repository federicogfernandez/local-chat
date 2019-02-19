import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class ConversationHeader extends Component {
  render() {
    const { headerData } = this.props;

    return (
      <div className="conversation-header">
        <div className="conversation-header__avatar">
          <img src={headerData.avatar} alt={headerData.name} />
        </div>
        <span className="conversation-header__username">{headerData.name}</span>
      </div>
    )
  }
}

ConversationHeader.propTypes = {
  headerData: PropTypes.object.isRequired,
};

export default ConversationHeader;