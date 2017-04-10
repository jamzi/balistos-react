import React from 'react';

const ChatOnline = props => (
  <div className="users">
    <div className="header">
      <div className="title">Users online</div>
      <div className="number">{props.users && props.users.length}</div>
    </div>
    <div className="body">
      {props.users && props.users.map(user => <div className={`user ${user.username === props.username ? 'green' : 'grey'}`} key={user.username}>{user.username}</div>)}
    </div>
  </div>
    );

module.exports = ChatOnline;
