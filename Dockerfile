# Step 1: Build
FROM node:18 AS build

# RUN apt-get update && apt-get install -y git

WORKDIR /app

# # ✅ Clone into current directory
# RUN git clone https://github.com/Ramasamy3488/devops-mern-frontend.git .

COPY . .

# Now package.json is in /app
RUN npm install

# 👇 Build arg
ARG REACT_APP_API_URL

ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build


# Step 2: Serve
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
