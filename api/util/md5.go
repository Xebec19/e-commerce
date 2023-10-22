package util

import (
	"crypto/md5"
	"encoding/hex"
)

func DecryptMD5(hash string) string {
	hasher := md5.New()
	hasher.Write([]byte(hash))
	hashedBytes := hasher.Sum(nil)
	hashedString := hex.EncodeToString(hashedBytes)

	return hashedString
}
