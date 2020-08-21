var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import axios from 'axios';
import './VideoRoomComponent.css';
import { OpenVidu } from 'openvidu-browser';
import StreamComponent from './stream/StreamComponent';

import OpenViduLayout from '../layout/openvidu-layout';
import UserModel from '../models/user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';

var localUser = new UserModel();

var VideoRoomComponent = function (_Component) {
    _inherits(VideoRoomComponent, _Component);

    function VideoRoomComponent(props) {
        _classCallCheck(this, VideoRoomComponent);

        var _this = _possibleConstructorReturn(this, (VideoRoomComponent.__proto__ || Object.getPrototypeOf(VideoRoomComponent)).call(this, props));

        _this.hasBeenUpdated = false;
        _this.layout = new OpenViduLayout();
        var sessionName = _this.props.sessionName ? _this.props.sessionName : 'SessionA';
        var userName = _this.props.user ? _this.props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100);
        _this.state = {
            mySessionId: sessionName,
            myUserName: userName,
            session: undefined,
            localUser: undefined,
            subscribers: [],
            chatDisplay: 'none'
        };

        _this.joinSession = _this.joinSession.bind(_this);
        _this.leaveSession = _this.leaveSession.bind(_this);
        _this.onbeforeunload = _this.onbeforeunload.bind(_this);
        _this.updateLayout = _this.updateLayout.bind(_this);
        _this.camStatusChanged = _this.camStatusChanged.bind(_this);
        _this.micStatusChanged = _this.micStatusChanged.bind(_this);
        _this.nicknameChanged = _this.nicknameChanged.bind(_this);
        _this.toggleFullscreen = _this.toggleFullscreen.bind(_this);
        _this.screenShare = _this.screenShare.bind(_this);
        _this.stopScreenShare = _this.stopScreenShare.bind(_this);
        _this.closeDialogExtension = _this.closeDialogExtension.bind(_this);
        _this.toggleChat = _this.toggleChat.bind(_this);
        _this.checkNotification = _this.checkNotification.bind(_this);
        _this.checkSize = _this.checkSize.bind(_this);
        return _this;
    }

    _createClass(VideoRoomComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var openViduLayoutOptions = {
                maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
                minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
                fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
                bigClass: 'OV_big', // The class to add to elements that should be sized bigger
                bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
                bigFixedRatio: false, // fixedRatio for the big ones
                bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
                bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
                bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
                animate: true // Whether you want to animate the transitions
            };

            this.layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
            window.addEventListener('beforeunload', this.onbeforeunload);
            window.addEventListener('resize', this.updateLayout);
            window.addEventListener('resize', this.checkSize);
            this.joinSession();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('beforeunload', this.onbeforeunload);
            window.removeEventListener('resize', this.updateLayout);
            window.removeEventListener('resize', this.checkSize);
            this.leaveSession();
        }
    }, {
        key: 'onbeforeunload',
        value: function onbeforeunload(event) {
            this.leaveSession();
        }
    }, {
        key: 'joinSession',
        value: function joinSession() {
            var _this2 = this;

            this.OV = new OpenVidu();

            this.setState({
                session: this.OV.initSession()
            }, function () {
                _this2.subscribeToStreamCreated();

                _this2.connectToSession();
            });
        }
    }, {
        key: 'connectToSession',
        value: function connectToSession() {
            if (this.props.token !== undefined) {
                console.log('token received: ', this.props.token);
                this.connect(this.props.token);
            } else {
                alert('There was an error getting the token.');
            }
        }
    }, {
        key: 'connect',
        value: function connect(token) {
            var _this3 = this;

            this.state.session.connect(token, { clientData: this.state.myUserName }).then(function () {
                _this3.connectWebCam();
            }).catch(function (error) {
                if (_this3.props.error) {
                    _this3.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                alert('There was an error connecting to the session:', error.message);
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
        }
    }, {
        key: 'connectWebCam',
        value: function connectWebCam() {
            var _this4 = this;

            var publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: localUser.isAudioActive(),
                publishVideo: localUser.isVideoActive(),
                resolution: '640x480',
                frameRate: 30,
                insertMode: 'APPEND'
            });

            if (this.state.session.capabilities.publish) {
                this.state.session.publish(publisher).then(function () {
                    if (_this4.props.joinSession) {
                        _this4.props.joinSession();
                    }
                });
            }
            localUser.setNickname(this.state.myUserName);
            localUser.setConnectionId(this.state.session.connection.connectionId);
            localUser.setScreenShareActive(false);
            localUser.setStreamManager(publisher);
            this.subscribeToUserChanged();
            this.subscribeToStreamDestroyed();
            this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });

            this.setState({ localUser: localUser }, function () {
                _this4.state.localUser.getStreamManager().on('streamPlaying', function (e) {
                    _this4.updateLayout();
                    publisher.videos[0].video.parentElement.classList.remove('custom-class');
                });
            }, function () {
                _this4.toggleFullscreen();
            });
        }
    }, {
        key: 'leaveSession',
        value: function leaveSession() {
            var mySession = this.state.session;

            if (mySession) {}
            // mySession.disconnect();


            // Empty all properties...
            this.OV = null;
            this.setState({
                session: undefined,
                subscribers: [],
                mySessionId: 'SessionA',
                myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
                localUser: undefined
            });
            if (this.props.leaveSession) {
                this.props.leaveSession();
            }
        }
    }, {
        key: 'camStatusChanged',
        value: function camStatusChanged() {
            localUser.setVideoActive(!localUser.isVideoActive());
            localUser.getStreamManager().publishVideo(localUser.isVideoActive());
            this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
            this.setState({ localUser: localUser });
        }
    }, {
        key: 'micStatusChanged',
        value: function micStatusChanged() {
            localUser.setAudioActive(!localUser.isAudioActive());
            localUser.getStreamManager().publishAudio(localUser.isAudioActive());
            this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
            this.setState({ localUser: localUser });
        }
    }, {
        key: 'nicknameChanged',
        value: function nicknameChanged(nickname) {
            var localUser = this.state.localUser;
            localUser.setNickname(nickname);
            this.setState({ localUser: localUser });
            this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() });
        }
    }, {
        key: 'deleteSubscriber',
        value: function deleteSubscriber(stream) {
            var remoteUsers = this.state.subscribers;
            var userStream = remoteUsers.filter(function (user) {
                return user.getStreamManager().stream === stream;
            })[0];
            var index = remoteUsers.indexOf(userStream, 0);
            if (index > -1) {
                remoteUsers.splice(index, 1);
                this.setState({
                    subscribers: remoteUsers
                });
            }
        }
    }, {
        key: 'subscribeToStreamCreated',
        value: function subscribeToStreamCreated() {
            var _this5 = this;

            this.state.session.on('streamCreated', function (event) {
                var subscriber = _this5.state.session.subscribe(event.stream, undefined);
                var subscribers = _this5.state.subscribers;
                subscriber.on('streamPlaying', function (e) {
                    _this5.checkSomeoneShareScreen();
                    subscriber.videos[0].video.parentElement.classList.remove('custom-class');
                });
                var newUser = new UserModel();
                newUser.setStreamManager(subscriber);
                newUser.setConnectionId(event.stream.connection.connectionId);
                newUser.setType('remote');
                var nickname = event.stream.connection.data.split('%')[0];
                newUser.setNickname(JSON.parse(nickname).clientData);
                subscribers.push(newUser);
                _this5.setState({
                    subscribers: subscribers
                }, function () {
                    if (_this5.state.localUser) {
                        _this5.sendSignalUserChanged({
                            isAudioActive: _this5.state.localUser.isAudioActive(),
                            isVideoActive: _this5.state.localUser.isVideoActive(),
                            nickname: _this5.state.localUser.getNickname(),
                            isScreenShareActive: _this5.state.localUser.isScreenShareActive()
                        });
                    }
                    _this5.updateLayout();
                });
            });
        }
    }, {
        key: 'subscribeToStreamDestroyed',
        value: function subscribeToStreamDestroyed() {
            var _this6 = this;

            // On every Stream destroyed...
            this.state.session.on('streamDestroyed', function (event) {
                // Remove the stream from 'subscribers' array
                _this6.deleteSubscriber(event.stream);
                setTimeout(function () {
                    _this6.checkSomeoneShareScreen();
                }, 20);
                event.preventDefault();
                _this6.updateLayout();
            });
        }
    }, {
        key: 'subscribeToUserChanged',
        value: function subscribeToUserChanged() {
            var _this7 = this;

            this.state.session.on('signal:userChanged', function (event) {
                var remoteUsers = _this7.state.subscribers;
                remoteUsers.forEach(function (user) {
                    if (user.getConnectionId() === event.from.connectionId) {
                        var data = JSON.parse(event.data);
                        console.log('EVENTO REMOTE: ', event.data);
                        if (data.isAudioActive !== undefined) {
                            user.setAudioActive(data.isAudioActive);
                        }
                        if (data.isVideoActive !== undefined) {
                            user.setVideoActive(data.isVideoActive);
                        }
                        if (data.nickname !== undefined) {
                            user.setNickname(data.nickname);
                        }
                        if (data.isScreenShareActive !== undefined) {
                            user.setScreenShareActive(data.isScreenShareActive);
                        }
                    }
                });
                _this7.setState({
                    subscribers: remoteUsers
                }, function () {
                    return _this7.checkSomeoneShareScreen();
                });
            });
        }
    }, {
        key: 'updateLayout',
        value: function updateLayout() {
            var _this8 = this;

            setTimeout(function () {
                _this8.layout.updateLayout();
            }, 20);
        }
    }, {
        key: 'sendSignalUserChanged',
        value: function sendSignalUserChanged(data) {
            var signalOptions = {
                data: JSON.stringify(data),
                type: 'userChanged'
            };
            this.state.session.signal(signalOptions);
        }
    }, {
        key: 'toggleFullscreen',
        value: function toggleFullscreen() {
            var document = window.document;
            var fs = document.getElementById('container');
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                if (fs.requestFullscreen) {
                    fs.requestFullscreen();
                } else if (fs.msRequestFullscreen) {
                    fs.msRequestFullscreen();
                } else if (fs.mozRequestFullScreen) {
                    fs.mozRequestFullScreen();
                } else if (fs.webkitRequestFullscreen) {
                    fs.webkitRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
    }, {
        key: 'screenShare',
        value: function screenShare() {
            var _this9 = this;

            var videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
            var publisher = this.OV.initPublisher(undefined, {
                videoSource: videoSource,
                publishAudio: localUser.isAudioActive(),
                publishVideo: localUser.isVideoActive(),
                mirror: false
            }, function (error) {
                if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
                    _this9.setState({ showExtensionDialog: true });
                } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
                    alert('Your browser does not support screen sharing');
                } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
                    alert('You need to enable screen sharing extension');
                } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
                    alert('You need to choose a window or application to share');
                }
            });

            publisher.once('accessAllowed', function () {
                _this9.state.session.unpublish(localUser.getStreamManager());
                localUser.setStreamManager(publisher);
                _this9.state.session.publish(localUser.getStreamManager()).then(function () {
                    localUser.setScreenShareActive(true);
                    _this9.setState({ localUser: localUser }, function () {
                        _this9.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });
                    });
                });
            });
            publisher.on('streamPlaying', function () {
                _this9.updateLayout();
                publisher.videos[0].video.parentElement.classList.remove('custom-class');
            });
        }
    }, {
        key: 'closeDialogExtension',
        value: function closeDialogExtension() {
            this.setState({ showExtensionDialog: false });
        }
    }, {
        key: 'stopScreenShare',
        value: function stopScreenShare() {
            this.state.session.unpublish(localUser.getStreamManager());
            this.connectWebCam();
        }
    }, {
        key: 'checkSomeoneShareScreen',
        value: function checkSomeoneShareScreen() {
            var isScreenShared = void 0;
            // return true if at least one passes the test
            isScreenShared = this.state.subscribers.some(function (user) {
                return user.isScreenShareActive();
            }) || localUser.isScreenShareActive();
            var openviduLayoutOptions = {
                maxRatio: 3 / 2,
                minRatio: 9 / 16,
                fixedRatio: isScreenShared,
                bigClass: 'OV_big',
                bigPercentage: 0.8,
                bigFixedRatio: false,
                bigMaxRatio: 3 / 2,
                bigMinRatio: 9 / 16,
                bigFirst: true,
                animate: true
            };
            this.layout.setLayoutOptions(openviduLayoutOptions);
            this.updateLayout();
        }
    }, {
        key: 'toggleChat',
        value: function toggleChat(property) {
            var display = property;

            if (display === undefined) {
                display = this.state.chatDisplay === 'none' ? 'block' : 'none';
            }
            if (display === 'block') {
                this.setState({ chatDisplay: display, messageReceived: false });
            } else {
                console.log('chat', display);
                this.setState({ chatDisplay: display });
            }
            this.updateLayout();
        }
    }, {
        key: 'checkNotification',
        value: function checkNotification(event) {
            this.setState({
                messageReceived: this.state.chatDisplay === 'none'
            });
        }
    }, {
        key: 'checkSize',
        value: function checkSize() {
            if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
                this.toggleChat('none');
                this.hasBeenUpdated = true;
            }
            if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
                this.hasBeenUpdated = false;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var mySessionId = this.state.mySessionId;
            var localUser = this.state.localUser;
            var chatDisplay = { display: this.state.chatDisplay };

            return React.createElement(
                'div',
                { className: 'container', id: 'container', style: this.props.containerStyle },
                React.createElement(ToolbarComponent, {
                    sessionId: mySessionId,
                    user: localUser,
                    showNotification: this.state.messageReceived,
                    camStatusChanged: this.camStatusChanged,
                    micStatusChanged: this.micStatusChanged,
                    screenShare: this.screenShare,
                    stopScreenShare: this.stopScreenShare,
                    toggleFullscreen: this.toggleFullscreen,
                    leaveSession: this.leaveSession,
                    toggleChat: this.toggleChat
                }),
                React.createElement(
                    'div',
                    { id: 'layout', className: 'bounds' },
                    localUser !== undefined && localUser.getStreamManager() !== undefined && React.createElement(
                        'div',
                        { className: 'OT_root OT_publisher custom-class', id: 'localUser' },
                        React.createElement(StreamComponent, { user: localUser, handleNickname: this.nicknameChanged })
                    ),
                    this.state.subscribers.map(function (sub, i) {
                        return React.createElement(
                            'div',
                            { key: i, className: 'OT_root OT_publisher custom-class', id: 'remoteUsers' },
                            React.createElement(StreamComponent, { user: sub, streamId: sub.streamManager.stream.streamId })
                        );
                    })
                )
            );
        }
    }]);

    return VideoRoomComponent;
}(Component);

export default VideoRoomComponent;