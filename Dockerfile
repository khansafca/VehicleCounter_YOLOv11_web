# Use the official Node.js image as a base image
FROM node:18-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Add a non-root user (recommended for security)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application (if needed, otherwise skip this step)
RUN npm run build

# Set the port the application will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]

