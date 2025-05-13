export async function requestCreateRoom(userId : string) {
    const response = await fetch('http://localhost:8000/create-room',{
        method : 'POST',
        headers : {
            'Content-Type':'application/json',
        },
        body:JSON.stringify({userId : userId}),
    })
    if (!response.ok) {
        throw new Error("failed to create room")
    }
    return await response.json();
}

export async function requestJoinRoom(userId: string, roomId: string) {
    const response = await fetch('http://localhost:8000/join-room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, roomId: roomId }),
    });
    if (!response.ok) {
        throw new Error('Failed to join room');
    }
    return await response.json();
}