# Step 1: Build
FROM node:18 AS build

# Install git
RUN apt-get update && apt-get install -y git

# Set working directory
WORKDIR /app

# Clone your frontend repo
RUN git clone https://github.com/YOUR_USERNAME/YOUR_REACT_REPO.git

COPY package*.json ./
RUN npm install

COPY . .

# 👇 Accept build arg
ARG REACT_APP_API_URL

# 👇 Set env for React build
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build


# Step 2: Serve
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
