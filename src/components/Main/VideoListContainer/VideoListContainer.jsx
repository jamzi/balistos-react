import React from 'react';
import PropTypes from 'prop-types';
import VideoList from '../VideoList';
import SearchVideo from '../SearchVideo';

const VideoListContainer = props => (
  <div className="col-lg-12 col-md-12 col-sm-7 col-xs-12 no-gutter">
    <div className="box playlist">
      <SearchVideo id={props.playlist.id} />
      <div className="body">
        <VideoList
          current={props.playlist.current}
          videos={props.playlist.videos}
        />
      </div>
    </div>
  </div>
);

VideoListContainer.propTypes = {
  playlist: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.title,
    videos: PropTypes.arrayOf(
      PropTypes.object.isRequired,
    ).isRequired,
    current: PropTypes.object,
  }).isRequired,

};

VideoListContainer.defaultProps = {
  playlist: {
    username: undefined,
    id: undefined,
    current: undefined,
  },
};

module.exports = VideoListContainer;