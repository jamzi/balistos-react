import Footer from './Footer';

var App = React.createClass({
    render: function() {
        return (
            <div className="full-height">
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;
