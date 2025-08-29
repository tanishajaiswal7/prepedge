import React, { useContext, useEffect, useRef } from "react";
import Peer from "peerjs";
import { DataContext } from "../context/DataProvider";
import Notepad from "./Notepad";
import CodeEditor from "./CodeEditor";

function AudioVideoScreen() {
  const { roomId, peerInstance, status, socket } = useContext(DataContext);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null); //refs to control the video elements

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.emit("joinRoom", roomId);
    const getUserMedia =
      navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    if (!peerInstance.current) {
      peerInstance.current = new Peer(); 
    }

    peerInstance.current.on("call", (call) => {
      getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream; //shows local camera 
          currentUserVideoRef.current.play();

          call.answer(mediaStream);

          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        })
        .catch((err) => {
          console.error("Failed to get local stream", err);
        });
    });

    if (status === "interviewee") {
      call(roomId);
    }
   //cleanup function to close the peer connection when component unmounts
    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
        peerInstance.current = null;
      }
    };
  }, [roomId, status]);

  const call = (remotePeerId) => {
    const getUserMedia =
      navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        const call = peerInstance.current.call(remotePeerId, mediaStream);

        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      })
      .catch((err) => {
        console.error("Failed to get local stream", err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-800 p-2 sm:p-4 lg:p-6">
      {/* Video and Notepad Section */}
      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-6 mb-4 lg:mb-6">
        {/* Videos Container */}
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 flex-1">
          {/* Current User Video */}
          <div className="w-full sm:w-1/2 lg:w-5/12">
            <div className="bg-gray-900 rounded-xl p-2">
              <h3 className="text-white text-sm font-medium mb-2">You</h3>
              <video
                ref={currentUserVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg shadow-xl bg-gray-700"
              />
            </div>
          </div>
          
          {/* Remote User Video */}
          <div className="w-full sm:w-1/2 lg:w-5/12">
            <div className="bg-gray-900 rounded-xl p-2">
              <h3 className="text-white text-sm font-medium mb-2">Interviewer</h3>
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg shadow-xl bg-gray-700"
              />
            </div>
          </div>
        </div>
        
        {/* Notepad */}
        <div className="w-full lg:w-2/12 min-h-[200px] lg:min-h-[250px]">
          <Notepad socket={socket} roomId={roomId} />
        </div>
      </div>
      
      {/* Code Editor Section */}
      <div className="w-full">
        <CodeEditor socket={socket} roomId={roomId} />
      </div>
    </div>
  );
}

export default AudioVideoScreen;
