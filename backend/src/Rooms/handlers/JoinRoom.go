package handlers

import (
	"fmt"
	"log"
	"myModule/Rooms/models"
)

func JoinRoom (userId string, roomId string, lobbyPointer *models.Lobby) error {
	// Check if room exists
	for _ , createdRoomPointer := range lobbyPointer.Rooms {
		if createdRoomPointer.ID == roomId {
			// Room Exists
			createdRoomPointer.Participants = append(createdRoomPointer.Participants, roomId)
			log.Printf("User %s joined room %s successfully", userId, userId)
			return nil
		}
	}
	// room don't exist
	return fmt.Errorf("error : room id %s doesn't exist", roomId);
}
