import './Styles/sessionWindow.css';
import {useState, useEffect, useRef} from 'react'
import {requestCreateRoom, requestJoinRoom} from '../Utils/api'
import VideoRoom from '../Components/VideoRoom'



export function JoiningLobby(){
    const [roomId, setRoomId] = useState('');
    const [userId, setUserId] = useState('');

    const ws = useRef<WebSocket | null> (null);

    useEffect(()=>{
        ws.current= new WebSocket(`ws:localhost:3000/ws?userId=${userId}`)

        ws.current.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.current.onmessage = (event) => {
            // setMessages((prev) => [...prev, `Server: ${event.data}`]);
        };

        ws.current.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        ws.current.onclose = () => {
            console.log("WebSocket disconnected");
        };
        }, [])

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
            <VideoRoom roomId={roomId} userId={userId} />
        </div>
    )
}

export default JoiningLobby;
