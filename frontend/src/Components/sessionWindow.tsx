import './Styles/sessionWindow.css';
import {useState} from 'react'


export function JoiningLobby(){
    const [meetingCode, setMeetingCode] = useState('');
    
    const handleJoin = async () => {
        try {
            const response = await fetch('http://localhost:8000/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 'armaan',         // You can make this dynamic later
                    roomId: meetingCode,
                }),
            });
    
            const data = await response.json();
            console.log('Joined Room:', data);
        } catch (error) {
            console.error('Failed to join room:', error);
        }
    };
    return (
        <div id="canvas">
            <div className="card">
                <div className="welcoming">Welcome to Pristine Meeing</div>
                <div className="inputField">
                    <input
                        className="meetingCodeInput"
                        type="text"
                        placeholder="Meeting Code"
                        value={meetingCode}
                        onChange={(e) => setMeetingCode(e.target.value)}
                    />
                </div>
                <button className="joinButton" onClick={handleJoin}>Join</button>
            </div>
        </div>
    )
}

// export default JoiningLobby;
