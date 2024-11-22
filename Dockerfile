# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.17.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Create a stage for installing client production dependecies.
FROM base as client-deps
# Set working directory for the frontend app
WORKDIR /usr/src/app/frontend

# Mount the frontend package.json and package-lock.json
RUN --mount=type=bind,source=./frontend/package.json,target=./package.json \
    --mount=type=bind,source=./frontend/package-lock.json,target=./package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the frontend application.
FROM client-deps as client-build

RUN --mount=type=bind,source=./frontend/package.json,target=./package.json \
    --mount=type=bind,source=./frontend/package-lock.json,target=./package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
# Copy the rest of the frontend source files
COPY ./frontend .

# Run the build script for the frontend
RUN npm run build

################################################################################
# Create a stage for installing server production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=./server/package.json,target=package.json \
    --mount=type=bind,source=./server/package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the server application.
FROM deps as build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=./server/package.json,target=./package.json \
    --mount=type=bind,source=./server/package-lock.json,target=./package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY ./server .
# Run the build script.
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

# Copy the frontend build output into the final image
COPY --from=client-build /usr/src/app/frontend/dist ./frontend/dist
# Use production node environment by default.
ENV NODE_ENV production

# Run the application as a root user -- for mkdir perms -- can change to node and make the dirs ahead of time, need to change server code is all.
USER root

# Copy package.json so that package manager commands can be used.
COPY ./server/package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY ./server/.env .env 


# Expose the port that the application listens on.
EXPOSE 8000

# Run the application.
CMD npm run start
