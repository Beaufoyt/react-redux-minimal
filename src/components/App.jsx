import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { switchTool } from '../actions/workshop';

import PureComponent from './PureComponent';

class App extends PureComponent {
    state = {
        initialClick: null,
    }

    setTool = (e) => {
        console.log('made it', e.target.name);
        this.props.switchTool('line');
    }

    getCursorPosition(e) {
        const c = document.getElementById('palette');
        const rect = c.getBoundingClientRect();

        return [e.clientX - rect.left, e.clientY - rect.top];
    }

    prevState = null;

    isActive = (key) => {
        return key === this.props.tool;
    }

    drawLine = (e) => {
        const c = document.getElementById('palette');
        const ctx = c.getContext('2d');
        ctx.putImageData(this.prevState, 0, 0);
        const currentClick = this.getCursorPosition(e);
        ctx.beginPath();
        ctx.moveTo(this.state.initialClick[0], this.state.initialClick[1]);
        ctx.lineTo(currentClick[0], currentClick[1], 6);

        ctx.strokeStyle = '#000000';

        ctx.stroke();
    }

    startLine = (e) => {
        const currentClick = this.getCursorPosition(e);
        const c = document.getElementById('palette');
        const ctx = c.getContext('2d');

        if (!this.state.initialClick) {
            this.prevState = ctx.getImageData(0, 0, c.width, c.height);
            this.setState({ initialClick: currentClick });
            c.addEventListener('mousemove', this.drawLine);
        } else {
            this.prevState = null;
            c.removeEventListener('mousemove', this.drawLine);
            this.setState({ initialClick: null });
        }
    }

    render() {
        return (
            <div>
                <div className="sidebar">
                    <button
                        name="line"
                        onClick={this.setTool}
                        className={`btn btn-tool ${this.isActive('line') ? 'active' : ''}`}>
                        <i className="fa fa-angle-right" />
                    </button>
                </div>
                <div className="palette-container">
                    <canvas width="500" height="500" onClick={this.startLine} id="palette" className="palette" />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    tool: PropTypes.string,
    switchTool: PropTypes.func.isRequired,
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
