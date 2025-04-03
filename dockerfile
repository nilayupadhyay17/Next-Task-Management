# Use official Node.js LTS image as base
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies (including Tailwind CSS)
RUN npm install

# Copy the entire Next.js project (excluding files in .dockerignore)
COPY . .

# Ensure Tailwind CSS is properly processed before build
RUN npx tailwindcss -i ./src/styles/globals.css -o ./public/output.css

# Build the Next.js app
RUN npm run build

# Use a lightweight Node.js image for runtime
FROM node:18-alpine AS runner

# Install Nginx
RUN apk add --no-cache nginx amazon-ssm-agent

# Set working directory for runtime
WORKDIR /app

# Copy the custom nginx.conf to the correct location
COPY nginx.conf /etc/nginx/nginx.conf

# Change permissions of nginx.conf
RUN chmod 644 /etc/nginx/nginx.conf

# Copy required files from builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/src src
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/next.config.mjs next.config.mjs
COPY --from=builder /app/public public

# Set environment variable for production
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Start Nginx and Next.js app
CMD ["sh", "-c", "nginx && amazon-ssm-agent && npm run start"] 