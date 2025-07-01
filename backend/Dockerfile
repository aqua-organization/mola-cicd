# Use the official Bun image as base
FROM oven/bun:1-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Development stage
FROM base AS development

# Expose port
EXPOSE 8000

# Start development server
CMD ["bun", "run", "dev"]

# Production stage
FROM base AS production

# Expose port
EXPOSE 8000

# Start production server
CMD ["bun", "run", "start"]
