import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Header extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="header">
        <div className="header__avatar">
          <img src={user.avatar} alt={user.name} />
        </div>
        <span className="header__username">{user.name}</span>
      </div>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Header;