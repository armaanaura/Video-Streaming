package handlers

import (
	"log"
	"github.com/gofiber/websocket/v2"
)

func SocketHandler(wsPointer *websocket.Conn) {
	for {
		messageType, message, err := wsPointer.ReadMessage()
		if err != nil {
			log.Println("read error:", err)
			break
		}
		log.Print("message recieved by websocket")

		// echo same message to the client to check if ws is working or not?

		err = wsPointer.WriteMessage(messageType, message)
		if err != nil {
			log.Println("Error while echoing : ", err)
		}
	}
}
