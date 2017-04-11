import React from 'react';
import PropTypes from 'prop-types';

const CreatePlaylist = (props) => {
  let title;
  let description;
  return (
    <div className={`dropdown ${props.open ? '' : 'hidden'}`} id="create" >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.value.trim() || !description.value.trim) {
            return;
          }
          props.onCreatePlaylistSubmit(title.value, description.value);
          title.value = '';
          description.value = '';
        }}
      >
        <div>
          <div className="title">Title</div>
          <div className="error" id="create-playlist-error" />
          <input type="text" id="playlist-title" ref={(node) => { title = node; }} />
          <div className="title">Description</div>
          <input type="text" id="playlist-title" ref={(node) => { description = node; }} />
        </div>
        <button type="submit" className="button green">Create</button>
      </form>
    </div>
  );
};

CreatePlaylist.propTypes = {
  onCreatePlaylistSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

module.exports = CreatePlaylist;
