import React from 'react';
import PropTypes from 'prop-types';

const ChatMessage = props => (
  <div className="message">
    <span
      title={new Date(props.message.created_at).toLocaleString()}
      className={`author ${props.message.user.username === props.username ? 'green' : 'grey'}`}
    >{props.message.user.username}:</span><span>{props.message.message}</span>
  </div>
    );

ChatMessage.propTypes = {
  username: PropTypes.string.isRequired,
  message: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    message: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

module.exports = ChatMessage;