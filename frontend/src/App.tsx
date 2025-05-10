import React, { useRef, useState } from 'react';

const App = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    const peer = new RTCPeerConnection();
    stream.getTracks().forEach(track => peer.addTrack(track, stream));
    peer.ontrack = (e) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = e.streams[0];
    };

    // Local-only fake 2-user setup
    peer.onicecandidate = (e) => {
      if (e.candidate) return;
      const offer = peer.localDescription!;
      peer.setRemoteDescription(offer);
    };

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    peerRef.current = peer;

    startRecording(stream);
  };

  const startRecording = (stream: MediaStream) => {
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setChunks(prev => [...prev, e.data]);
      }
    };
    recorder.start(10000); // every 10s

    setInterval(() => {
      if (chunks.length) {
        const blob = new Blob(chunks, { type: 'video/webm' });
        uploadChunk(blob);
        setChunks([]);
      }
    }, 10000);

    mediaRecorderRef.current = recorder;
  };

  const uploadChunk = async (blob: Blob) => {
    const formData = new FormData();
    formData.append('file', blob, `recording.webm`);
    await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div>
      <h2>2-User Video MVP</h2>
      <button onClick={startCall}>Start Call</button>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <video ref={localVideoRef} autoPlay playsInline muted width={300} />
        <video ref={remoteVideoRef} autoPlay playsInline width={300} />
      </div>
    </div>
  );
};

export default App;
