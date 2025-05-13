package main

import (
	"fmt"
	"log"
	"myModule/Rooms/handlers"
	"myModule/Rooms/models"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())

	var lobby models.Lobby = models.Lobby{
		Rooms: []*models.Room{},
	}
	var lobbyPointer = &lobby

	// API Post request for creating a room in lobby
	app.Post("/create-room", func(conn *fiber.Ctx) error {
		log.Println("Create Room request initialized")
		type request struct {
			UserId string `json:"userId"`
		}
		var body request
		if err := conn.BodyParser(&body); err != nil {
			log.Printf("Invalid request body: %v", err)
			return conn.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status":  "error",
				"message": "Invalid request body",
				"error":   err.Error(),
			})
		}
		roomPointer := handlers.CreateRoom(body.UserId, lobbyPointer)
		log.Printf("Room created successfully with ID: %s", roomPointer.ID)
		return conn.Status(fiber.StatusCreated).JSON(fiber.Map{
			"status":  "success",
			"message": fmt.Sprintf("Room created successfully with ID: %s", roomPointer.ID),
			"roomId":  roomPointer.ID,
		})
	})
	// API request to join room
	app.Post("/join-room", func(conn *fiber.Ctx) error {
		type request struct {
			UserId string
			RoomId string
		}
		var body request
		if err := conn.BodyParser(&body); err != nil {
			log.Printf("Invalid request body: %v", err)
			return conn.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status":  "error",
				"message": "Invalid request body",
				"error":   err.Error(),
			})
		}
		err := handlers.JoinRoom(body.UserId, body.RoomId, lobbyPointer)
		if err != nil {
			return conn.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status":  "error",
				"message": "User Id don't exist",
				"error":   err,
			})
		}
		return conn.Status(fiber.StatusCreated).JSON(fiber.Map{
			"status":  "success",
			"message": "User joined successfully",
		})
	})
	err := app.Listen(":8000")
	if err != nil {
		println("Failed to start server:", err.Error())
	}
}
