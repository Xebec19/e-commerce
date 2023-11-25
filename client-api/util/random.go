package util

import (
	"fmt"
	"math/rand"
	"strings"
	"time"

	gonanoid "github.com/matoous/go-nanoid/v2"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

const alphabets = "abcdefghijklmnopqrstuvxyz"
const idDigits = "abcdefghijklmnopqrstuvxyz123456789"

// RandomString generates a random string of given length
func RandomString(n int) string {
	var sb strings.Builder
	k := len(alphabets)
	for i := 0; i < n; i++ {
		c := alphabets[rand.Intn(k)]
		sb.WriteByte(c)
	}
	return sb.String()
}

func RandomNumber(maximum int) int {
	return rand.Intn(maximum)
}

// RandomEmail generates a random email
func RandomEmail() string {
	return fmt.Sprintf("%s@email.com", RandomString(10))
}

func RandomId(size int) string {
	id, err := gonanoid.Generate(idDigits, size)
	if err != nil {
		return ""
	}

	return fmt.Sprintf("ORDER_%v", id)
}
