# Stage 1: Build the React app
FROM node:16-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built app using a simple HTTP server
FROM node:16-alpine

# Install a simple HTTP server to serve the React app
RUN npm install -g serve

# Set the working directory in the container
WORKDIR /app

# Copy the build files from the previous stage
COPY --from=build /app/build ./build

# Expose the port that the app runs on
EXPOSE 3000

# Start the HTTP server to serve the React app
CMD ["serve", "-s", "build", "-l", "3000"]
