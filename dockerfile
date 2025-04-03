# Stage 1: Build Stage
FROM node:18.17.0 as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Run Next.js build
RUN npm run build

# Install PM2 globally
RUN npm install -g pm2

# Stage 2: Production Stage
FROM nginx:alpine

# Install dependencies for Nginx and PM2
RUN apk update && apk add supervisor nodejs npm

# Copy built assets and other necessary files from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/src src
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/next.config.mjs next.config.mjs
COPY --from=builder /app/public public
COPY --from=builder /app/ecosystem.config.js ecosystem.config.js

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 3000 80

# Start Nginx and Next.js app using PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
