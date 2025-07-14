FROM nodered/node-red:latest

# Switch to root to install additional packages
USER root

# Install additional system packages if needed
RUN apk add --no-cache curl

# Switch back to node-red user
USER node-red

# Set npm cache to writable location for cross-platform builds
RUN npm config set cache /tmp/.npm

# Environment variables
ENV NODE_RED_ENABLE_PROJECTS=true

# Copy flows and settings
COPY --chown=node-red:node-red flows.json /data/flows.json
COPY --chown=node-red:node-red settings.js /data/settings.js

# Expose Node-RED port
EXPOSE 1880

# Start Node-RED
CMD ["node-red"] 
