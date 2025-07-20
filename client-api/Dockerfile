FROM golang:1.21-alpine AS builder

WORKDIR /app

# Install required system dependencies
RUN apk add --no-cache gcc musl-dev

# Copy go mod and sum files first for better caching
COPY go.mod go.sum ./
RUN go mod download && go mod verify

# Copy the rest of the source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Final stage
FROM alpine:3.18

WORKDIR /app

# Install necessary runtime dependencies
RUN apk add --no-cache ca-certificates tzdata

# Copy binary and configuration files
COPY --from=builder /app/main .
COPY app.env .
COPY start.sh .

# Make start.sh executable
RUN chmod +x /app/start.sh

EXPOSE 8080

ENTRYPOINT ["/app/start.sh"]
CMD ["/app/main"]