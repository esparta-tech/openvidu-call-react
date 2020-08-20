import React, { Component } from 'react';
import './ToolbarComponent.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone';
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons/faMicrophoneSlash';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons/faVideoSlash';
import { faExpand } from '@fortawesome/free-solid-svg-icons/faExpand';
import { faCompress } from '@fortawesome/free-solid-svg-icons/faCompress';

export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { fullscreen: false };
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
    }


    micStatusChanged() {
        this.props.micStatusChanged();
    }

    camStatusChanged() {
        this.props.camStatusChanged();
    }

    screenShare() {
        this.props.screenShare();
    }

    stopScreenShare() {
        this.props.stopScreenShare();
    }

    toggleFullscreen() {
        this.setState({ fullscreen: !this.state.fullscreen });
        this.props.toggleFullscreen();
    }

    leaveSession() {
        this.props.leaveSession();
    }


    render() {
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        return (
            <div className="toolbar" id="header">
                <div className="buttonsContent">
                    <div className="navButton pointer" onClick={this.micStatusChanged}>
                        {localUser !== undefined && localUser.isAudioActive() ? (
                            <FontAwesomeIcon icon={faMicrophone} color="white"/>
                        ) : (
                            <FontAwesomeIcon icon={faMicrophoneSlash} color="white"/>
                        )}
                    </div>
                    <div className="navButton pointer" onClick={this.camStatusChanged}>
                        {localUser !== undefined && localUser.isVideoActive() ? (
                            <FontAwesomeIcon icon={faVideo} color="white" />
                        ) : (
                            <FontAwesomeIcon icon={faVideoSlash} color="white"/>
                        )}
                    </div>
                    <div className="navButton pointer" onClick={this.toggleFullscreen}>
                        {localUser !== undefined && this.state.fullscreen ? (
                            <FontAwesomeIcon icon={faCompress} color="white"/> 
                        ) : (
                            <FontAwesomeIcon icon={faExpand} color="white"/>
                        )}
                    </div>
                </div>
            
            </div>
        );
    }
}
