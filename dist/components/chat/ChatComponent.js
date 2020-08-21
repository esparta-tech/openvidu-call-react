var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Send from '@material-ui/icons/Send';

import './ChatComponent.css';
import { Tooltip } from '@material-ui/core';

var ChatComponent = function (_Component) {
    _inherits(ChatComponent, _Component);

    function ChatComponent(props) {
        _classCallCheck(this, ChatComponent);

        var _this = _possibleConstructorReturn(this, (ChatComponent.__proto__ || Object.getPrototypeOf(ChatComponent)).call(this, props));

        _this.state = {
            messageList: [],
            message: ''
        };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handlePressKey = _this.handlePressKey.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.sendMessage = _this.sendMessage.bind(_this);
        return _this;
    }

    _createClass(ChatComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.props.user.getStreamManager().stream.session.on('signal:chat', function (event) {
                var data = JSON.parse(event.data);
                var messageList = _this2.state.messageList;
                messageList.push({ connectionId: event.from.connectionId, nickname: data.nickname, message: data.message });
                var document = window.document;
                setTimeout(function () {
                    var userImg = document.getElementById('userImg-' + (_this2.state.messageList.length - 1));
                    var video = document.getElementById('video-' + data.streamId);
                    var avatar = userImg.getContext('2d');
                    avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
                    _this2.props.messageReceived();
                }, 50);
                _this2.setState({ messageList: messageList });
            });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ message: event.target.value });
        }
    }, {
        key: 'handlePressKey',
        value: function handlePressKey(event) {
            if (event.key === 'Enter') {
                this.sendMessage();
            }
        }
    }, {
        key: 'sendMessage',
        value: function sendMessage() {
            console.log(this.state.message);
            if (this.props.user && this.state.message) {
                var message = this.state.message.replace(/ +(?= )/g, '');
                if (message !== '' && message !== ' ') {
                    var data = { message: message, nickname: this.props.user.getNickname(), streamId: this.props.user.getStreamManager().stream.streamId };
                    this.props.user.getStreamManager().stream.session.signal({
                        data: JSON.stringify(data),
                        type: 'chat'
                    });
                }
            }
            this.setState({ message: '' });
        }
    }, {
        key: 'close',
        value: function close() {
            this.props.close(undefined);
        }
    }, {
        key: 'render',
        value: function render() {
            var styleChat = { display: this.props.chatDisplay };
            return React.createElement(
                'div',
                { id: 'chatContainer' },
                React.createElement(
                    'div',
                    { id: 'chatComponent', style: styleChat },
                    React.createElement(
                        'div',
                        { id: 'chatToolbar' },
                        React.createElement(
                            'span',
                            null,
                            this.props.user.getStreamManager().stream.session.sessionId,
                            ' - CHAT'
                        ),
                        React.createElement(
                            IconButton,
                            { id: 'closeButton', onClick: this.close },
                            React.createElement(HighlightOff, { color: 'secondary' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'messageInput' },
                        React.createElement('input', {
                            placeholder: 'Send a messge',
                            id: 'chatInput',
                            value: this.state.message,
                            onChange: this.handleChange,
                            onKeyPress: this.handlePressKey
                        }),
                        React.createElement(
                            Tooltip,
                            { title: 'Send message' },
                            React.createElement(
                                Fab,
                                { size: 'small', id: 'sendButton', onClick: this.sendMessage },
                                React.createElement(Send, null)
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ChatComponent;
}(Component);

export default ChatComponent;