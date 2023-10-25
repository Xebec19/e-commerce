# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json, yarn.lock, and .env to the container
COPY package.json yarn.lock .env ./

# Install Yarn globally and project dependencies
RUN npm install -g yarn && yarn install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the application's port (Next.js defaults to 3000)
EXPOSE 3000

# Start the application
CMD [ "yarn", "start" ]
