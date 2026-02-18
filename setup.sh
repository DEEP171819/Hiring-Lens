#!/bin/bash

# HiringLens Setup Script for macOS/Linux

echo ""
echo "========================================"
echo "HiringLens - Setup Script"
echo "========================================"
echo ""

# Check if Node.js is installed
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js found: $(node --version)"

# Check if Python is installed
echo ""
echo "Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python is not installed. Please install Python from https://www.python.org/"
    exit 1
fi
echo "✓ Python found: $(python3 --version)"

# Install Backend
echo ""
echo "========================================"
echo "Installing Backend Dependencies..."
echo "========================================"
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi
echo "✓ Backend dependencies installed"
cd ..

# Install ML Service
echo ""
echo "========================================"
echo "Installing ML Service Dependencies..."
echo "========================================"
cd ml-service
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install ML service dependencies"
    exit 1
fi
echo "✓ ML service dependencies installed"
cd ..

# Install Frontend
echo ""
echo "========================================"
echo "Installing Frontend Dependencies..."
echo "========================================"
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
echo "✓ Frontend dependencies installed"
cd ..

echo ""
echo "========================================"
echo "Installation Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Open 3 terminal windows"
echo ""
echo "Terminal 1 - Backend:"
echo "   cd backend && npm start"
echo ""
echo "Terminal 2 - ML Service:"
echo "   cd ml-service && python3 main.py"
echo ""
echo "Terminal 3 - Frontend:"
echo "   cd frontend && npm start"
echo ""
echo "The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "   ML Service: http://localhost:8000"
echo ""
