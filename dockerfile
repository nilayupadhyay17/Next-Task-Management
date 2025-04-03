# Use a lightweight Node.js image for runtime
FROM node:18-alpine AS runner

# Install required dependencies
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

# Start Nginx, AWS SSM Agent, and Next.js app
CMD ["sh", "-c", "nginx && amazon-ssm-agent && npm run start"]
