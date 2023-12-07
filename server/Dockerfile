# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of the client code
COPY . .

# Start the client
CMD ["yarn", "start"]