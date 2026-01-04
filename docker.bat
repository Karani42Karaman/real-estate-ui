@echo off
REM Real Estate UI - Docker Build & Run Script for Windows

setlocal enabledelayedexpansion

echo.
echo 🐳 Real Estate UI - Docker Setup
echo ==================================
echo.

REM Check Docker installation
docker --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Error: Docker is not installed. Please install Docker Desktop first.
    exit /b 1
)

echo ✓ Docker found

REM Parse command line arguments
set COMMAND=%1
if "%COMMAND%"=="" set COMMAND=help

if "%COMMAND%"=="build" (
    echo Building Docker image...
    docker build -t real-estate-ui:latest .
    echo ✓ Build complete!
    goto :eof
)

if "%COMMAND%"=="run" (
    echo Starting container with docker-compose...
    docker-compose up -d
    echo ✓ Container is running!
    echo App is available at http://localhost:4000
    echo Nginx proxy is available at http://localhost
    goto :eof
)

if "%COMMAND%"=="stop" (
    echo Stopping containers...
    docker-compose down
    echo ✓ Containers stopped!
    goto :eof
)

if "%COMMAND%"=="logs" (
    echo Showing application logs...
    docker-compose logs -f real-estate-ui
    goto :eof
)

if "%COMMAND%"=="shell" (
    echo Opening shell in container...
    docker-compose exec real-estate-ui sh
    goto :eof
)

if "%COMMAND%"=="clean" (
    echo Cleaning up Docker resources...
    docker-compose down -v
    docker rmi real-estate-ui:latest 2>nul
    echo ✓ Cleanup complete!
    goto :eof
)

REM Default: show help
echo Usage: %0 [build^|run^|stop^|logs^|shell^|clean]
echo.
echo Commands:
echo   build    - Build Docker image
echo   run      - Start containers with docker-compose
echo   stop     - Stop running containers
echo   logs     - View application logs
echo   shell    - Open shell in running container
echo   clean    - Remove all Docker resources
echo.
echo Examples:
echo   %0 build    # Build the image
echo   %0 run      # Start the app
echo   %0 stop     # Stop the app
echo   %0 logs     # View logs
