import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { switchTool } from '../actions/workshop';

import PureComponent from './PureComponent';

class App extends PureComponent {
    isActive = (key) => {
        const { tool } = this.props;
        return key === tool;
    }

    render() {
        return (
            <div className="header">
                <h3>Admin Panel</h3>
            </div>
        );
    }
}

App.propTypes = {
    tool: PropTypes.string,
};

App.defaultProps = {
    tool: '',
};

const mapStateToProps = state => ({
    tool: state.workshop.tool,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ switchTool }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
