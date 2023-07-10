import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
function Room() {
  const { roomID } = useParams();

  const userName = localStorage.getItem("userName");

  const myMeeting = async (element) => {
    const appID = 270736326;
    const serverSecret = "fd680d554ed927e676810fcd3f8a28e1";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      userName
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
    });
  };
  return (
    <>
      <div>
        <div ref={myMeeting} />
      </div>
      ;
    </>
  );
}

export default Room;
