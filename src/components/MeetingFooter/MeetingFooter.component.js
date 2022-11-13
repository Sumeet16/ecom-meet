import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faDesktop,
  faVideoSlash,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./MeetingFooter.css";
const MeetingFooter = (props) => {
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
    screen: false,
  });
  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  const onScreenClick = () => {
    props.onScreenClick(setScreenState);
  };

  const setScreenState = (isEnabled) => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        screen: isEnabled,
      };
    });
  };
  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);
  useEffect(() => {
    props.onVideoClick(streamState.video);
  }, [streamState.video]);

  const urlparams = new URLSearchParams(window.location.search);
  const refId = urlparams.get("ref");

  return (
    <div className="meeting-footer">
      {refId === 'admin' ?
        <>
          <div
            className={"meeting-icons " + (!streamState.mic ? "active" : "")}
            data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
            onClick={micClick}
          >
            <FontAwesomeIcon
              icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
              title="Mute"
            />
          </div>
          <div
            className={"meeting-icons " + (!streamState.video ? "active" : "")}
            data-tip={streamState.video ? "Hide Video" : "Show Video"}
            onClick={onVideoClick}
          >
            <FontAwesomeIcon icon={!streamState.video ? faVideoSlash : faVideo} />
          </div>
          <div
            className="meeting-icons"
            data-tip="Share Screen"
            onClick={onScreenClick}
            disabled={streamState.screen}
          >
            <FontAwesomeIcon icon={faDesktop} />
          </div>
        </> : <></>}
      <div className="leaveButton" data-tip="Leave Meeting"><p>Leave Meeting</p></div>
      <ReactTooltip />
    </div>
  );
};

export default MeetingFooter;
