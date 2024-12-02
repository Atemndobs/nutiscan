# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++ pkgconfig cairo-dev pango-dev jpeg-dev giflib-dev librsvg-dev

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install production dependencies
RUN apk add --no-cache cairo pango jpeg giflib librsvg

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
