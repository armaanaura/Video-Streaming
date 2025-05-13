package utils

import (
	"github.com/gofiber/websocket/v2"
	"github.com/gofiber/fiber/v2"

)

var roomSockets = make(map[string][]*websocket.Conn)

func RegisterRoutes(app *fiber.App) {
	app.Get("/ws/:roomId", websocket.New(func(c *websocket.Conn) {
		roomId := c.Params("roomId")
		roomSockets[roomId] = append(roomSockets[roomId], c)
		defer c.Close()

		for {
			_, msg, err := c.ReadMessage()
			if err != nil {
				break
			}
			for _, other := range roomSockets[roomId] {
				if other != c {
					other.WriteMessage(websocket.TextMessage, msg)
				}
			}
		}
	}))
}
