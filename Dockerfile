# Stage 1: Build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy a custom nginx config if you have one, or just use default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]