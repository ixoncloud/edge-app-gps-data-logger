@echo off
setlocal enabledelayedexpansion

echo Building and pushing GPS Logger containers to SecureEdge Pro...

REM Remove the existing instance if necessary
docker buildx rm secure-edge-pro 2>nul || echo Buildx instance not found, continuing...

REM Create and initialize the build environment.
docker buildx create --name secure-edge-pro --config buildkitd-secure-edge-pro.toml
if errorlevel 1 (
    echo Failed to create buildx instance
    exit /b 1
)

docker buildx use secure-edge-pro
if errorlevel 1 (
    echo Failed to use buildx instance
    exit /b 1
)

REM Build the Node-RED container
echo Building Node-RED container...
cd node-red\
docker buildx build --platform linux/arm64/v8 --tag 192.168.140.1:5000/node-red-gps-logger:latest --push .
if errorlevel 1 (
    echo Failed to build and push Node-RED container
    cd ..
    exit /b 1
)
cd ..

echo Both containers successfully built and pushed to SecureEdge Pro registry
echo.
echo To create the containers on SecureEdge Pro:
echo.
echo 1. Create Node-RED container second:
echo    - Image: 192.168.140.1:5000/node-red-gps-logger:latest
echo    - Container name: node-red
echo    - Port Mapping: 1880:1880
echo    - Volume Mapping: Mount a named volume to /data

endlocal 
