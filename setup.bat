@echo off
REM HiringLens Setup Script for Windows

echo.
echo ========================================
echo HiringLens - Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js found: 
node --version

REM Check if Python is installed
echo.
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed. Please install Python from https://www.python.org/
    pause
    exit /b 1
)
echo ✓ Python found:
python --version

REM Install Backend
echo.
echo ========================================
echo Installing Backend Dependencies...
echo ========================================
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
cd ..

REM Install ML Service
echo.
echo ========================================
echo Installing ML Service Dependencies...
echo ========================================
cd ml-service
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install ML service dependencies
    pause
    exit /b 1
)
echo ✓ ML service dependencies installed
cd ..

REM Install Frontend
echo.
echo ========================================
echo Installing Frontend Dependencies...
echo ========================================
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
cd ..

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Open 3 terminal windows
echo.
echo Terminal 1 - Backend:
echo   cd backend && npm start
echo.
echo Terminal 2 - ML Service:
echo   cd ml-service && python main.py
echo.
echo Terminal 3 - Frontend:
echo   cd frontend && npm start
echo.
echo The application will be available at:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo   ML Service: http://localhost:8000
echo.
pause
