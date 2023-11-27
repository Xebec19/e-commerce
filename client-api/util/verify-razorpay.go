package util

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"log"
	"strings"
)

func VerifyRazorpaySignature(orderId string, paymentId string, signature string) bool {

	config, err := LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	payload := orderId + "|" + paymentId

	h := hmac.New(sha256.New, []byte(config.RazorpaySecret))
	h.Write([]byte(payload))
	calculatedSignature := hex.EncodeToString(h.Sum(nil))

	return strings.EqualFold(signature, calculatedSignature)
}
