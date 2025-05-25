# Use Node.js 18 LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install global dependencies including Task Master
RUN npm install -g task-master-ai

# Copy package files first for better caching
COPY package*.json ./

# Install project dependencies
RUN npm ci --only=production

# Copy project files (excluding what's in .dockerignore)
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose the port Next.js runs on
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health-check || exit 1

# Default command
CMD ["npm", "run", "dev"] 