package handlers

import (
	"fmt"
	"log"
	"myModule/Rooms/models"
	"myModule/Rooms/utils"
)

func CreateRoom(userId string, lobby *models.Lobby) *models.Room {
	fmt.Printf("Room creation initialized by the user : %s", userId)
	var newRoom = models.Room{
		ID:           utils.GenerateRandomId(10),
		Participants: []string{userId},
	}
	var roomPointer = &newRoom
	lobby.Rooms = append(lobby.Rooms, roomPointer)
	log.Printf("Room Created \n Room ID : %s \n", roomPointer.ID)
	return roomPointer
}
