import { connect } from 'react-redux';
import Chat from './Chat';
import ChatOnline from './ChatOnline';
import { fetchMessages, sendMessage } from '../../actions'

//const socket = io('http://localhost:4000');

function mapStateToProps(state) {
    return {
        messages: state.playlist.messages,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendMessage: (message) => {
            dispatch(sendMessage(message, ownProps.playlist, ownProps.playlist_id));
        }
    }
}

var ChatContainer = React.createClass({
    render: function() {
        const { dispatch, sendMessage } = this.props;
        return (
            <div className="right-sidebar col-lg-5 col-md-6 col-sm-5 col-xs-12 left-gutter middle-gutter">
                <ChatOnline />
                <Chat messages={this.props.messages} sendMessage={sendMessage} />
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
