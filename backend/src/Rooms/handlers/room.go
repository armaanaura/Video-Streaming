package handlers

import (
	"fmt"
	"math/rand"
	"myModule/Rooms/models"
)

func generateRandomId(idLength int) string {
	const charSet string = "abcdefghijklmnoprstuvwxyz1234567890!@#$%&"
	id := make([]byte, idLength)
	for i := range id {
		id[i] = charSet[rand.Intn(len(charSet))]
	}
	fmt.Printf("New Id generated is : %d", id)
	return string(id)
}

// func CreateRoom () *models.Room {
// 	var room = &models.Room{
// 		ID : generateRandomId(5),
// 		Participants : []string{},
// 	}
// 	return room
// }

// func JoinRoom(room *models.Room, userPhoneNumber string) error {
// 	for _, participant := range room.Participants{
// 		if(participant==userPhoneNumber){
// 			return fmt.Errorf("user %s already exists", userPhoneNumber)
// 		}
// 	}
// 	room.Participants = append(room.Participants, userPhoneNumber)
// 	return nil
// }

func LeaveRoom(room *models.Room, userPhoneNumber string) error {
	index := -1
	for i, participant := range room.Participants {
		if participant == userPhoneNumber {
			index = i
			break
		}
	}
	if index == -1 {
		return fmt.Errorf("user %s not found in room", userPhoneNumber)
	}
	room.Participants = append(room.Participants[:index], room.Participants[index+1:]...)
	return nil
}


