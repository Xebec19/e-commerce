package util

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
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

type Entity struct {
	Amount   int    `json:"amount"`
	Currency string `json:"currency"`
	Status   string `json:"status"`
	OrderId  string `json:"order_id"`
}

type PaymentEntity struct {
	Entity Entity `json:"entity"`
}

type PayloadEntity struct {
	Payment PaymentEntity `json:"payment"`
}

type RazorpayWebhookEvent struct {
	Type    string        `json:"event"`
	Payload PayloadEntity `json:"payload"`
}

func ParseRazorpayWebhookEvent(body string) (*RazorpayWebhookEvent, error) {

	var event RazorpayWebhookEvent
	if err := json.Unmarshal([]byte(body), &event); err != nil {
		return nil, err
	}

	return &event, nil
}

func VerifyRazorpayWebhookSignature(body string, signature string) bool {

	config, err := LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	h := hmac.New(sha256.New, []byte(config.WebhookSecret))
	h.Write([]byte(body))
	calculatedSignature := hex.EncodeToString(h.Sum(nil))

	return strings.EqualFold(signature, calculatedSignature)
}
