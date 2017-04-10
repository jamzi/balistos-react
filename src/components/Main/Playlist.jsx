import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import VideoListContainer from './VideoListContainer';
import VideoPlayer from './VideoPlayer';
import ChatContainer from './ChatContainer';
import RelatedVideos from './RelatedVideos';
import {
  fetchPlaylist,
  sendHeartbeat,
  finishVideo,
  deleteVideo,
  getActiveUsers,
  startVideo,
  getRelatedVideos,
} from '../../actions';

import { API_INDEX } from '../../settings';

const socket = io(API_INDEX);

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  playlist: state.playlist,
  username: state.auth.username,
});

const mapDispatchToProps = dispatch => ({
  fetchVideos: (id) => {
    dispatch(fetchPlaylist(id));
  },
  socketAction: (action) => {
    dispatch(action);
  },
  heartbeat: (username, playlist) => {
    dispatch(sendHeartbeat(username, playlist));
  },
  getActiveUsers: (playlist) => {
    dispatch(getActiveUsers(playlist));
  },
  finishVideo: (videoId) => {
    dispatch(finishVideo(videoId));
  },
  deleteVideo: (videoId) => {
    dispatch(deleteVideo(videoId));
  },
  startVideo: (videoId) => {
    dispatch(startVideo(videoId));
  },
  getRelatedVideos: (videoId) => {
    dispatch(getRelatedVideos(videoId));
  },
});

class Playlist extends React.Component {
  componentDidMount() {
    this.initPlaylist();
    socket.on('action', (action) => {
      this.props.socketAction(action);
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      socket.emit('leave', `playlist_${prevProps.id}`);
      this.initPlaylist();
    }
  }
  componentWillUnmount() {
    socket.emit('leave', `playlist_${this.props.id}`);
  }
  initPlaylist() {
    this.props.fetchVideos(this.props.id);
    socket.emit('join', `playlist_${this.props.id}`);
    this.heartbeat();
  }
  heartbeat() {
    if (this.props.username) {
      this.props.heartbeat(this.props.username, this.props.id);
    } else {
      this.props.getActiveUsers(this.props.id);
    }
    setTimeout(this.heartbeat, 60000);
  }
  render() {
    return (
      <main>
        <div className="container">
          <VideoPlayer
            current={this.props.playlist.current}
            username={this.props.username}
            getRelatedVideos={this.props.getRelatedVideos}
            finishVideo={this.props.finishVideo} startVideo={this.props.startVideo}
            deleteVideo={this.props.deleteVideo}
          />
          <div className="sidebar col-lg-5 col-md-6 col-sm-12 col-xs-12 left-gutter">
            <VideoListContainer playlist={this.props.playlist} />
            <ChatContainer playlist={this.props.playlist} id={this.props.id} />
            <RelatedVideos />
          </div>
        </div>
      </main>
    );
  }
}

Playlist.propTypes = {
  id: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired,
  socketAction: React.PropTypes.function.isRequired,
  fetchVideos: React.PropTypes.function.isRequired,
  deleteVideo: React.PropTypes.function.isRequired,
  finishVideo: React.PropTypes.function.isRequired,
  startVideo: React.PropTypes.function.isRequired,
  heartbeat: React.PropTypes.function.isRequired,
  getActiveUsers: React.PropTypes.function.isRequired,
  getRelatedVideos: React.PropTypes.function.isRequired,
  playlist: React.PropTypes.shape({
    current: React.PropTypes.element.isRequired,
  }).isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
