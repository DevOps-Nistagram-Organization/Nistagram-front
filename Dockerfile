# Stage 1: Build an Angular Docker Image
FROM stevicdule/npm-base-nistagram-frontend:1.0.0-dev as build
# Create app directory. This directory must have the same name as the directory in Dockerfile.base file /app.
# Our application will be copied in the same directory where npm dependencies are installed
WORKDIR /app
# No need to download again npm dependencies,
# you will use dependencies from npm base image that already have installed those dependencies
# COPY package*.json /app/
# RUN npm install
COPY . /app
# Enabling npm to find ng
ENV PATH="./node_modules/.bin:$PATH"
# Angular Live Development Server is listening on 0.0.0.0:4200, open your browser on http://localhost:4200/
# url = protocol://domain:port
#  protocol: http
#  domain: localhost = 0.0.0.0
#  port: 4200
EXPOSE 4200
CMD ng serve --host 0.0.0.0



