package models

import "github.com/gofiber/websocket"

type WebsocketConnections struct {
	Connections map[string]*websocket.Conn
}
