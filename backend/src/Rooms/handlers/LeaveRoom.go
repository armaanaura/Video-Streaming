package handlers

import (
	"fmt"
	"myModule/Rooms/models"
)

// INCOMPLETE, HAVE ISSUES
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
