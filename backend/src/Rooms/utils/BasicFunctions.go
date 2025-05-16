package utils

import (
	"fmt"
	"math/rand"
)

func GenerateRandomId(idLength int) string {
	const charSet string = "abcdefghijklmnoprstuvwxyz1234567890!@#$%&"
	id := make([]byte, idLength)
	for i := range id {
		id[i] = charSet[rand.Intn(len(charSet))]
	}
	fmt.Printf("New Id generated is : %s", string(id))
	return string(id)
}
