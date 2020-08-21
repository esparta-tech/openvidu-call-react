var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import './ToolbarComponent.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone';
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons/faMicrophoneSlash';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons/faVideoSlash';
import { faExpand } from '@fortawesome/free-solid-svg-icons/faExpand';
import { faCompress } from '@fortawesome/free-solid-svg-icons/faCompress';

var ToolbarComponent = function (_Component) {
    _inherits(ToolbarComponent, _Component);

    function ToolbarComponent(props) {
        _classCallCheck(this, ToolbarComponent);

        var _this = _possibleConstructorReturn(this, (ToolbarComponent.__proto__ || Object.getPrototypeOf(ToolbarComponent)).call(this, props));

        _this.state = { fullscreen: false };
        _this.camStatusChanged = _this.camStatusChanged.bind(_this);
        _this.micStatusChanged = _this.micStatusChanged.bind(_this);
        _this.screenShare = _this.screenShare.bind(_this);
        _this.stopScreenShare = _this.stopScreenShare.bind(_this);
        _this.toggleFullscreen = _this.toggleFullscreen.bind(_this);
        _this.leaveSession = _this.leaveSession.bind(_this);
        return _this;
    }

    _createClass(ToolbarComponent, [{
        key: 'micStatusChanged',
        value: function micStatusChanged() {
            this.props.micStatusChanged();
        }
    }, {
        key: 'camStatusChanged',
        value: function camStatusChanged() {
            this.props.camStatusChanged();
        }
    }, {
        key: 'screenShare',
        value: function screenShare() {
            this.props.screenShare();
        }
    }, {
        key: 'stopScreenShare',
        value: function stopScreenShare() {
            this.props.stopScreenShare();
        }
    }, {
        key: 'toggleFullscreen',
        value: function toggleFullscreen() {
            this.setState({ fullscreen: !this.state.fullscreen });
            this.props.toggleFullscreen();
        }
    }, {
        key: 'leaveSession',
        value: function leaveSession() {
            this.props.leaveSession();
        }
    }, {
        key: 'render',
        value: function render() {
            var mySessionId = this.props.sessionId;
            var localUser = this.props.user;
            return React.createElement(
                'div',
                { className: 'toolbar', id: 'header' },
                React.createElement(
                    'div',
                    { className: 'buttonsContent' },
                    React.createElement(
                        'div',
                        { className: 'navButton pointer', onClick: this.micStatusChanged },
                        localUser !== undefined && localUser.isAudioActive() ? React.createElement(FontAwesomeIcon, { icon: faMicrophone, color: 'white' }) : React.createElement(FontAwesomeIcon, { icon: faMicrophoneSlash, color: 'white' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'navButton pointer', onClick: this.camStatusChanged },
                        localUser !== undefined && localUser.isVideoActive() ? React.createElement(FontAwesomeIcon, { icon: faVideo, color: 'white' }) : React.createElement(FontAwesomeIcon, { icon: faVideoSlash, color: 'white' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'navButton pointer', onClick: this.toggleFullscreen },
                        localUser !== undefined && this.state.fullscreen ? React.createElement(FontAwesomeIcon, { icon: faCompress, color: 'white' }) : React.createElement(FontAwesomeIcon, { icon: faExpand, color: 'white' })
                    )
                )
            );
        }
    }]);

    return ToolbarComponent;
}(Component);

export default ToolbarComponent;