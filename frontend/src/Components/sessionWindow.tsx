import './Styles/sessionWindow.css';
import {useState} from 'react'
import {requestCreateRoom, requestJoinRoom} from '../Utils/api'
// import useWebSocket from 'react-use-websocket'; 

// const peer = new RTCPeerConnection({
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// });

// const socket = new WebSocket("")
// socket.onmessage = async (event) =>{
//     const data = JSON.parse(event.data);

//     if(data.type==="offer"){
//         await peer.setRemoteDescription(new RTCSessionDescription(data.sdp));
//         const answer = await peer.createAnswer();
//         await peer.setLocalDescription(answer)
//         socket.send(JSON.stringify({"type":"answer", "sdp": answer}))
//     } else if(data.type === "answer"){
//         await peer.setRemoteDescription(new RTCSessionDescription(data.sdp));
//     }else if (data.type ==="canditate"){
//         await peer.addIceCandidate(new RTCIceCandidate(data.candidate));
//     }
// };



export function JoiningLobby(){
    const [roomId, setRoomId] = useState('');
    const [userId, setUserId] = useState('');

    const createRoom = async () => {
        try{
            const data = await requestCreateRoom(userId)
            console.log(data)
        }catch(error){
            console.error(error)
        }
    }
    
    const joinRoom = async () => {
        try{
            const data = await requestJoinRoom(userId, roomId)
            console.log(data)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div id="canvas">
            <div className="card">
                <div className="welcoming">Welcome to Pristine Meeing</div>
                <div className="inputField">
                    <input
                        className="meetingCodeInput"
                        type="text"
                        placeholder="Meeting Code"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                </div>
                <div className="inputField">
                    <input
                        className="meetingCodeInput"
                        type="text"
                        placeholder="Phone Number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <button className="joinButton" onClick={joinRoom}>Join</button>
                <button className="createButton" onClick={createRoom}>Create</button>
            </div>
        </div>
    )
}

export default JoiningLobby;
