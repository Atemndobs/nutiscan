#!/bin/bash

# Stop and remove the existing container if it exists
docker-compose down -v --rmi all

# Start the new container
docker-compose up -d

# Clean up unused images
docker image prune -f