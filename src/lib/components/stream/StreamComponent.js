import React, { Component } from 'react';
import OvVideoComponent from './OvVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons/faMicrophoneSlash';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons/faVideoSlash';
import './StreamComponent.css';

export default class StreamComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { nickname: this.props.user.getNickname(), mutedSound: false };
        this.toggleSound = this.toggleSound.bind(this);
    }

    toggleSound() {
        this.setState({ mutedSound: !this.state.mutedSound });
    }

    render() {
        return (
            <div className="OT_widget-container">
                <div className="nickname">
                    <span id="nickname">{this.props.user.getNickname()}</span>
                </div>
                {this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? (
                    <div className="streamComponent">
                        <OvVideoComponent user={this.props.user} mutedSound={this.state.mutedSound} />
                        <div id="statusIcons">
                            {!this.props.user.isVideoActive() ? (
                                <div id="camIcon">
                                    <FontAwesomeIcon icon={faVideoSlash} color="white"/>
                                </div>
                            ) : null}
                            {!this.props.user.isAudioActive() ? (
                                <div id="micIcon">
                                    <FontAwesomeIcon icon={faMicrophoneSlash} color="white"/>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
