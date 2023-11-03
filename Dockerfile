# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the React app dependencies
RUN npm ci

# Copy the app files to the working directory
COPY . .

# Build the React app
RUN npm run build

# Remove development dependencies
#RUN npm prune --production

# Set build-time environment variable
ARG REACT_APP_BACKEND_API_URL

# Set runtime environment variable
ENV REACT_APP_BACKEND_API_URL=$REACT_APP_BACKEND_API_URL

# Serve the React app using a lightweight server (serve)
# Install the "serve" package globally
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]