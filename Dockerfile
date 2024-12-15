# Use the official Node.js image as a base image
FROM node:18-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Add a non-root user (recommended for security)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

<<<<<<< HEAD
# Copy package.json and package-lock.json to the container
COPY package*.json ./
=======
RUN chown -R nextjs:nodejs /app

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
>>>>>>> fcf2678d2ffd9147429d18a743324c6792e08bb6

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application (if needed, otherwise skip this step)
RUN npm run build

# Set the port the application will run on
EXPOSE 3000

<<<<<<< HEAD
# Start the Next.js application
=======
ENV PORT 3000

>>>>>>> fcf2678d2ffd9147429d18a743324c6792e08bb6
CMD ["npm", "start"]
