package main

import (
	"myModule/Rooms/handlers"
	"myModule/Rooms/models"

	"github.com/gofiber/fiber/v2"

	// "github.com/google/uuid"
	"fmt"

	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())

	var lobby models.Lobby = models.Lobby{
		Rooms : []*models.Room{},
	}

	app.Post("/create-room", func(conn *fiber.Ctx) error {
		var roomPointer = handlers.CreateRoom()
		lobby.Rooms = append(lobby.Rooms, roomPointer)
		return nil
	})
	
	app.Post("/join-room", func(conn * fiber.Ctx) error {
		type request struct {
			UserId string
			RoomId string
		}
		var body request 
		if err := conn.BodyParser(&body) ; err!= nil{
			return conn.Status(400).SendString("Invalid request : on join room route")
		}
		var requestedRoomId string= body.RoomId

		var foundId bool = false
		for _, createdRoomIdPointer := range lobby.Rooms {
			if(*&createdRoomIdPointer.ID == requestedRoomId){
				foundId= true
				createdRoomIdPointer.Participants= append(createdRoomIdPointer.Participants, body.UserId)
				break
			}
		}
		if foundId == false {
			fmt.Errorf("room id %s doesn't exist", body.RoomId)
			return conn.Status(400).SendString("Invalid request : No room exists with this id")
		}
		return nil
	})


	// -------------------------------------------------------



	// JOIN endpoint
	app.Post("/join", func(c *fiber.Ctx) error {
		type request struct {
			UserId string `json:"userId"`
			RoomId string `json:"roomId"`
		}
		var body request
		if err := c.BodyParser(&body); err != nil {
			return c.Status(400).SendString("Invalid request")
		}

		if body.RoomId != room.ID {
			return c.Status(404).SendString("Room not found")
		}

		room.Participants = append(room.Participants, body.UserId)
		fmt.Print("new user joined")
		return c.JSON(room)
	})

	// GET endpoint
	app.Get("/room/:id", func(c *fiber.Ctx) error {
		if c.Params("id") != room.ID {
			return c.Status(404).SendString("Room not found")
		}
		fmt.Printf("new user joined")
		return c.JSON(room)
	})
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("✅ Fiber server is running")
	})

	// Add this log
	println("✅ Server running on http://localhost:3000")
	err := app.Listen(":8000")
	if err != nil {
		println("❌ Failed to start server:", err.Error())
	}
}
