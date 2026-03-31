# ----------- Step 1: Build React App -----------
FROM node:18 AS build

# Install git
RUN apt-get update && apt-get install -y git

# Set working directory
WORKDIR /app

# Clone your frontend repo
RUN git clone https://github.com/YOUR_USERNAME/YOUR_REACT_REPO.git .

# Install dependencies
RUN npm install

# Build React app
RUN npm run build


# ----------- Step 2: Serve with Nginx -----------
FROM nginx:alpine

# Copy build files to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]