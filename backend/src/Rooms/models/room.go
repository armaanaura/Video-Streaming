package models

type Room struct {
	ID           string
	Participants []string
}

type Lobby struct {
	Rooms []*Room
}
