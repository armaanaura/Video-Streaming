import React, { useEffect, useRef, useState } from "react";

const peer = new RTCPeerConnection({
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
});


export default function VideoRoom({ roomId, userId }: { roomId: string, userId: string }) {
    const peerRef = useRef<RTCPeerConnection | null>(null);
    const localVideo = useRef<HTMLVideoElement>(null);
    const remoteVideo = useRef<HTMLVideoElement>(null);
    const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const setup = async () => {
      peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // 2. Get local stream
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localVideo.current) {
      localVideo.current.srcObject = stream;
    }

    stream.getTracks().forEach(track => {
      peerRef.current?.addTrack(track, stream); // ✅ avoid .addTrack on closed connection
    });
      // Connect to signaling server
      socketRef.current = new WebSocket(`ws://localhost:8000/ws/${roomId}`);

      // Handle incoming messages
      socketRef.current.onmessage = async (event) => {
        const msg = JSON.parse(event.data);

        if (msg.type === "offer") {
          await peer.setRemoteDescription(new RTCSessionDescription(msg.sdp));
          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);
          socketRef.current?.send(JSON.stringify({ type: "answer", sdp: answer }));
        } else if (msg.type === "answer") {
          await peer.setRemoteDescription(new RTCSessionDescription(msg.sdp));
        } else if (msg.type === "candidate") {
          await peer.addIceCandidate(new RTCIceCandidate(msg.candidate));
        }
      };

      // Send ICE candidates
      peer.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current?.send(JSON.stringify({ type: "candidate", candidate: event.candidate }));
        }
      };

      // Render remote stream
      peer.ontrack = (event) => {
        if (remoteVideo.current) remoteVideo.current.srcObject = event.streams[0];
      };
    };

    setup();

    return () => {
      peer.close();
      socketRef.current?.close();
    };
  }, [roomId]);

  // Trigger offer manually (for first user)
  const startCall = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socketRef.current?.send(JSON.stringify({ type: "offer", sdp: offer }));
  };

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <video ref={localVideo} autoPlay muted playsInline width={300} />
      <video ref={remoteVideo} autoPlay playsInline width={300} />
      <button onClick={startCall}>Start Call</button>
    </div>
  );
}
