# Stage 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Copy and install dependencies
COPY package.json .
RUN npm install

# Rebuild esbuild for Alpine Linux
RUN npm rebuild esbuild

# Copy the rest of the source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy built files to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config 
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
