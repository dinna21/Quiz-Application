# Use a lightweight web server
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx website
RUN rm -rf ./*

# Copy your app (HTML/CSS/JS) into nginx's public directory
COPY . .

# Expose default port
EXPOSE 80

# Nginx starts by default, no CMD required
