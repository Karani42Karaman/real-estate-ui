#!/bin/bash

# Real Estate UI - Docker Build & Run Script

set -e

echo "🐳 Real Estate UI - Docker Setup"
echo "=================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Docker installation
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker found${NC}"

# Parse command line arguments
COMMAND=${1:-help}

case $COMMAND in
    build)
        echo -e "${YELLOW}Building Docker image...${NC}"
        docker build -t real-estate-ui:latest .
        echo -e "${GREEN}✓ Build complete!${NC}"
        ;;
    run)
        echo -e "${YELLOW}Starting container with docker-compose...${NC}"
        docker-compose up -d
        echo -e "${GREEN}✓ Container is running!${NC}"
        echo "App is available at http://localhost:4000"
        echo "Nginx proxy is available at http://localhost"
        ;;
    stop)
        echo -e "${YELLOW}Stopping containers...${NC}"
        docker-compose down
        echo -e "${GREEN}✓ Containers stopped!${NC}"
        ;;
    logs)
        echo -e "${YELLOW}Showing application logs...${NC}"
        docker-compose logs -f real-estate-ui
        ;;
    shell)
        echo -e "${YELLOW}Opening shell in container...${NC}"
        docker-compose exec real-estate-ui sh
        ;;
    clean)
        echo -e "${YELLOW}Cleaning up Docker resources...${NC}"
        docker-compose down -v
        docker rmi real-estate-ui:latest 2>/dev/null || true
        echo -e "${GREEN}✓ Cleanup complete!${NC}"
        ;;
    *)
        echo "Usage: $0 {build|run|stop|logs|shell|clean}"
        echo ""
        echo "Commands:"
        echo "  build    - Build Docker image"
        echo "  run      - Start containers with docker-compose"
        echo "  stop     - Stop running containers"
        echo "  logs     - View application logs"
        echo "  shell    - Open shell in running container"
        echo "  clean    - Remove all Docker resources"
        echo ""
        echo "Examples:"
        echo "  $0 build    # Build the image"
        echo "  $0 run      # Start the app"
        echo "  $0 stop     # Stop the app"
        echo "  $0 logs     # View logs"
        exit 1
        ;;
esac
