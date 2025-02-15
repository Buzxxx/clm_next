# Use a minimal Node.js image
FROM node:18-alpine AS runtime

# Set the working directory inside the container
WORKDIR /app

# Copy the standalone build and necessary assets
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public

# Expose the port Next.js runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Command to start the Next.js standalone server
CMD ["node", "server.js"]
