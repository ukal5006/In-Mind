import React, { Component } from 'react';
import './ToolbarComponent.css';

// import AppBar from '@mui/core/AppBar';
// import Toolbar from '@mui/core/Toolbar';
// import Tooltip from '@mui/core/Tooltip';
// import IconButton from '@mui/core/IconButton';

import { AppBar, Toolbar, Tooltip, IconButton } from '@mui/material';

// import Mic from '@mui/icons/Mic';
// import MicOff from '@mui/icons/MicOff';
// import Videocam from '@mui/icons/Videocam';
// import VideocamOff from '@mui/icons/VideocamOff';
// import Fullscreen from '@mui/icons/Fullscreen';
// import FullscreenExit from '@mui/icons/FullscreenExit';
// import SwitchVideoIcon from '@mui/icons/SwitchVideo';
// import PictureInPicture from '@mui/icons/PictureInPicture';
// import ScreenShare from '@mui/icons/ScreenShare';
// import StopScreenShare from '@mui/icons/StopScreenShare';
// import PowerSettingsNew from '@mui/icons/PowerSettingsNew';
// import QuestionAnswer from '@mui/icons/QuestionAnswer';

import {
    Mic,
    MicOff,
    Videocam,
    VideocamOff,
    Fullscreen,
    FullscreenExit,
    PictureInPicture,
    ScreenShare,
    StopScreenShare,
    PowerSettingsNew,
    QuestionAnswer,
} from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';

const logo = require('../../assets/images/openvidu_logo.png');
const showReport = () => {
    console.log('openReport in Modal');
};

export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { fullscreen: false };
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
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

    switchCamera() {
        this.props.switchCamera();
    }

    leaveSession() {
        this.props.leaveSession();
    }

    toggleChat() {
        this.props.toggleChat();
    }

    render() {
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        return (
            <AppBar className="toolbar" id="header">
                <Toolbar className="toolbar">
                    <div id="navSessionInfo">
                        <img id="header_img" alt="OpenVidu Logo" src={logo} />

                        {this.props.sessionId && (
                            <div id="titleContent">
                                <span id="session-title">{mySessionId}</span>
                            </div>
                        )}
                    </div>

                    <div className="buttonsContent">
                        <IconButton
                            color="inherit"
                            className="navButton"
                            id="navMicButton"
                            onClick={this.micStatusChanged}
                        >
                            {localUser !== undefined && localUser.isAudioActive() ? (
                                <Mic />
                            ) : (
                                <MicOff color="secondary" />
                            )}
                        </IconButton>

                        <IconButton
                            color="inherit"
                            className="navButton"
                            id="navCamButton"
                            onClick={this.camStatusChanged}
                        >
                            {localUser !== undefined && localUser.isVideoActive() ? (
                                <Videocam />
                            ) : (
                                <VideocamOff color="secondary" />
                            )}
                        </IconButton>

                        <IconButton color="inherit" className="navButton" onClick={this.screenShare}>
                            {localUser !== undefined && localUser.isScreenShareActive() ? (
                                <PictureInPicture />
                            ) : (
                                <ScreenShare />
                            )}
                        </IconButton>

                        {localUser !== undefined && localUser.isScreenShareActive() && (
                            <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                                <StopScreenShare color="secondary" />
                            </IconButton>
                        )}

                        {/* <IconButton color="inherit" className="navButton" onClick={this.switchCamera}>
                            <SwitchVideoIcon />
                        </IconButton> */}
                        <IconButton color="inherit" className="navButton" onClick={this.toggleFullscreen}>
                            {localUser !== undefined && this.state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
                        </IconButton>

                        <IconButton color="inherit" onClick={this.toggleChat} id="navChatButton">
                            {this.props.showNotification && <div id="point" className="" />}
                            <Tooltip title="Chat">
                                <QuestionAnswer />
                            </Tooltip>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}
