var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import OvVideoComponent from './OvVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons/faMicrophoneSlash';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons/faVideoSlash';
import './StreamComponent.css';

var StreamComponent = function (_Component) {
    _inherits(StreamComponent, _Component);

    function StreamComponent(props) {
        _classCallCheck(this, StreamComponent);

        var _this = _possibleConstructorReturn(this, (StreamComponent.__proto__ || Object.getPrototypeOf(StreamComponent)).call(this, props));

        _this.state = { nickname: _this.props.user.getNickname(), mutedSound: false };
        _this.toggleSound = _this.toggleSound.bind(_this);
        return _this;
    }

    _createClass(StreamComponent, [{
        key: 'toggleSound',
        value: function toggleSound() {
            this.setState({ mutedSound: !this.state.mutedSound });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'OT_widget-container' },
                React.createElement(
                    'div',
                    { className: 'nickname' },
                    React.createElement(
                        'span',
                        { id: 'nickname' },
                        this.props.user.getNickname()
                    )
                ),
                this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? React.createElement(
                    'div',
                    { className: 'streamComponent' },
                    React.createElement(OvVideoComponent, { user: this.props.user, mutedSound: this.state.mutedSound }),
                    React.createElement(
                        'div',
                        { id: 'statusIcons' },
                        !this.props.user.isVideoActive() ? React.createElement(
                            'div',
                            { id: 'camIcon' },
                            React.createElement(FontAwesomeIcon, { icon: faVideoSlash, color: 'white' })
                        ) : null,
                        !this.props.user.isAudioActive() ? React.createElement(
                            'div',
                            { id: 'micIcon' },
                            React.createElement(FontAwesomeIcon, { icon: faMicrophoneSlash, color: 'white' })
                        ) : null
                    )
                ) : null
            );
        }
    }]);

    return StreamComponent;
}(Component);

export default StreamComponent;