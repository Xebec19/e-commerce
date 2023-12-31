package util

import (
	"github.com/spf13/viper"
)

type Config struct {
	DBDriver       string `mapstructure:"DB_DRIVER"`
	DBSource       string `mapstructure:"DB_SOURCE"`
	ServerAddress  string `mapstructure:"SERVER_ADDRESS"`
	JwtSecret      string `mapstructure:"JWT_SECRET"`
	Env            string `mapstructure:"ENV"`
	RazorpayKey    string `mapstructure:"RAZORPAY_KEY"`
	RazorpaySecret string `mapstructure:"RAZORPAY_SECRET"`
	Currency       string `mapstructure:"CURRENCY"`
	WebhookSecret  string `mapstructure:"RAZORPAY_WEBHOOK_SECRET"`
}

func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	return
}
