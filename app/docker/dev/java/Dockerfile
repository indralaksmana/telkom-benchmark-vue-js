#==================== Building Stage ================================================ 

# Create the image based on the official Node 8.9.0 image from Dockerhub
FROM node:8.9.0 as node

# Create a directory where our app will be placed. This might not be necessary
# RUN mkdir -p vue_php

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package.json /app

# Install dependencies using npm
RUN npm install

# Get all the code needed to run the app
COPY . /app

COPY ./docker/dev/java/.env.development /app/.env.development

# Expose the port the app runs in
# EXPOSE 4200

#Build the app
RUN npm run dev-build

#==================== Setting up stage ==================== 
# Create image based on the official nginx - Alpine image
FROM nginx:1.14.2-alpine

COPY --from=node /app/dist/ /usr/share/nginx/html

COPY ./docker/nginx-vue.conf /etc/nginx/conf.d/default.conf
