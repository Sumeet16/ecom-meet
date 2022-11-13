import React, { useEffect, useRef } from "react";
import "./Participants.css";
import { connect } from "react-redux";
import { Participant } from "./Participant/Participant.component";

const urlparams = new URLSearchParams(window.location.search);
const refId = urlparams.get("ref");

const Participants = (props) => {
  const videoRef = useRef(null);
  let participantKey = Object.keys(props.participants);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = props.stream;
      videoRef.current.muted = true;
    }
  }, [props.currentUser, props.stream]);

  const currentUser = props.currentUser
    ? Object.values(props.currentUser)[0]
    : null;

  let gridCol =
    participantKey.length === 1 ? 1 : participantKey.length <= 4 ? 2 : 4;
  const gridColSize = participantKey.length <= 4 ? 1 : 2;
  let gridRowSize =
    participantKey.length <= 4
      ? participantKey.length
      : Math.ceil(participantKey.length / 2);

  const screenPresenter = participantKey.find((element) => {
    const currentParticipant = props.participants[element];
    return currentParticipant.screen;
  });

  if (screenPresenter) {
    gridCol = 1;
    gridRowSize = 2;
  }


  const participants = participantKey.map((element, index) => {
    const currentParticipant = props.participants[element];
    console.log("Data below");
    console.log(currentParticipant);
    if (currentParticipant.name === 'Admin') {
      const isCurrentUser = currentParticipant.currentUser;
      if (isCurrentUser) {
        return null;
      }
      const pc = currentParticipant.peerConnection;
      const remoteStream = new MediaStream();
      let curentIndex = index;
      if (pc) {
        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
          const videElement = document.getElementById(
            `participantVideo${curentIndex}`
          );
          if (videElement) videElement.srcObject = remoteStream;
        };
      }

      return (
        refId === "admin" ? <></> : <>
          <Participant
            key={curentIndex}
            currentParticipant={currentParticipant}
            curentIndex={curentIndex}
            hideVideo={screenPresenter && screenPresenter !== element}
            showAvatar={
              !currentParticipant.video &&
              !currentParticipant.screen &&
              currentParticipant.name
            }
          />
        </>
      );
    } else {

    }
  });


  return (
    refId != 'admin' ? <><div className={`participants`}>
      <h1 style={{ color: "#fff", position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)" }}>Wait for the admin to join....</h1>
      {participants}
    </div></> : <>
      <div className={`participants`}>
        <Participant
          currentParticipant={currentUser}
          curentIndex={participantKey.length}
          hideVideo={screenPresenter && !currentUser.screen}
          videoRef={videoRef}
          showAvatar={currentUser && !currentUser.video && !currentUser.screen}
          currentUser={true}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    participants: state.participants,
    currentUser: state.currentUser,
    stream: state.mainStream,
  };
};

export default connect(mapStateToProps)(Participants);
