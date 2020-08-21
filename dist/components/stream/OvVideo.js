var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import './StreamComponent.css';

var OvVideoComponent = function (_Component) {
    _inherits(OvVideoComponent, _Component);

    function OvVideoComponent(props) {
        _classCallCheck(this, OvVideoComponent);

        var _this = _possibleConstructorReturn(this, (OvVideoComponent.__proto__ || Object.getPrototypeOf(OvVideoComponent)).call(this, props));

        _this.videoRef = React.createRef();
        return _this;
    }

    _createClass(OvVideoComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (this.props && this.props.user.streamManager && !!this.videoRef) {
                console.log('PROPS: ', this.props);
                this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
            }

            if (this.props && this.props.user.streamManager.session && this.props.user && !!this.videoRef) {
                this.props.user.streamManager.session.on('signal:userChanged', function (event) {
                    var data = JSON.parse(event.data);
                    if (data.isScreenShareActive !== undefined) {
                        _this2.props.user.getStreamManager().addVideoElement(_this2.videoRef.current);
                    }
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props) {
            if (props && !!this.videoRef) {
                this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('video', {
                autoPlay: true,
                id: 'video-' + this.props.user.getStreamManager().stream.streamId,
                ref: this.videoRef,
                muted: this.props.mutedSound
            });
        }
    }]);

    return OvVideoComponent;
}(Component);

export default OvVideoComponent;