#!/bin/bash

# Build and push GPS Logger containers to SecureEdge Pro
# Output executed commands and stop on errors.
set -e

# Uncomment the following line should the edge gateway have been
# given a different IP address.
# docker buildx rm secure-edge-pro;

# Remove the existing instance if necessary
docker buildx rm secure-edge-pro || true

# Create and initialize the build environment.
docker buildx create --name secure-edge-pro \
                     --config buildkitd-secure-edge-pro.toml
docker buildx use secure-edge-pro

# Build the Node-RED container
echo "Building Node-RED container..."
cd node-red/
docker buildx build --platform linux/arm64/v8 --tag 192.168.140.1:5000/node-red-gps-logger:latest --push .
cd ..

echo "Both containers successfully built and pushed to SecureEdge Pro registry"
echo ""
echo "To create the containers on SecureEdge Pro:"
echo ""
echo "1. Create Node-RED container second:"
echo "   - Image: 192.168.140.1:5000/node-red-gps-logger:latest"
echo "   - Container name: node-red"
echo "   - Port Mapping: 1880:1880"
echo "   - Volume Mapping: Mount a named volume to /data" 
