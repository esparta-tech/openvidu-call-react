var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './DialogExtension.css';

var DialogExtensionComponent = function (_Component) {
    _inherits(DialogExtensionComponent, _Component);

    function DialogExtensionComponent(props) {
        _classCallCheck(this, DialogExtensionComponent);

        var _this = _possibleConstructorReturn(this, (DialogExtensionComponent.__proto__ || Object.getPrototypeOf(DialogExtensionComponent)).call(this, props));

        _this.openviduExtensionUrl = 'https://chrome.google.com/webstore/detail/openvidu-screensharing/lfcgfepafnobdloecchnfaclibenjold';
        //isInstalled: boolean;

        _this.state = {
            isInstalled: false
        };
        _this.goToChromePage = _this.goToChromePage.bind(_this);
        _this.onNoClick = _this.onNoClick.bind(_this);
        _this.refreshBrowser = _this.refreshBrowser.bind(_this);
        return _this;
    }

    _createClass(DialogExtensionComponent, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'onNoClick',
        value: function onNoClick() {
            // this.cancel.emit();
            this.props.cancelClicked();
        }
    }, {
        key: 'goToChromePage',
        value: function goToChromePage() {
            window.open(this.openviduExtensionUrl);
            this.setState({ isInstalled: true });
        }
    }, {
        key: 'refreshBrowser',
        value: function refreshBrowser() {
            window.location.reload();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.props && this.props.showDialog ? React.createElement(
                    'div',
                    { id: 'dialogExtension' },
                    React.createElement(
                        Card,
                        { id: 'card' },
                        React.createElement(
                            CardContent,
                            null,
                            React.createElement(
                                Typography,
                                { color: 'textSecondary' },
                                'Hello'
                            ),
                            React.createElement(
                                Typography,
                                { color: 'textSecondary' },
                                'You need install this chrome extension and refresh the browser for can share your screen.'
                            )
                        ),
                        React.createElement(
                            CardActions,
                            null,
                            React.createElement(
                                Button,
                                { size: 'small', onClick: this.onNoClick },
                                'Cancel'
                            ),
                            React.createElement(
                                Button,
                                { size: 'small', onClick: this.goToChromePage },
                                'Install'
                            ),
                            this.state.isInstalled ? React.createElement(
                                Button,
                                { size: 'small', onClick: this.refreshBrowser },
                                'Refresh'
                            ) : null
                        )
                    )
                ) : null
            );
        }
    }]);

    return DialogExtensionComponent;
}(Component);

export default DialogExtensionComponent;