#!/bin/bash

# Pull the latest image
docker pull atemnbobs/nutriscan-pwa:latest

# Stop and remove the existing container if it exists
docker-compose down

# Start the new container
docker-compose up -d

# Clean up unused images
docker image prune -f
