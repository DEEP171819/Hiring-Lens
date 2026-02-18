# HiringLens Installation Guide

## Prerequisites

Before running HiringLens, ensure you have the following installed:

- **Node.js 16+**: https://nodejs.org/
- **Python 3.8+**: https://www.python.org/
- **npm**: Usually comes with Node.js

## Verify Installations

### Check Node.js
```bash
node --version
npm --version
```

### Check Python
```bash
python --version
# or
python3 --version
```

## Automated Setup

### Windows
```bash
setup.bat
```

### macOS/Linux
```bash
chmod +x setup.sh
./setup.sh
```

## Manual Setup

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Install ML Service Dependencies
```bash
cd ml-service
pip install -r requirements.txt
# or
python -m pip install -r requirements.txt
```

### Step 3: Install Frontend Dependencies
```bash
cd frontend
npm install
```

## Running the Application

Open 3 terminal windows and run each in a separate terminal:

### Terminal 1: Backend Server
```bash
cd backend
npm start
```
- Runs on: http://localhost:5000
- Provides: REST API for resume upload and ranking

### Terminal 2: ML Service
```bash
cd ml-service
python main.py
# or
python3 main.py
```
- Runs on: http://localhost:8000
- Provides: Resume processing and ranking ML endpoints

### Terminal 3: Frontend Application
```bash
cd frontend
npm start
```
- Runs on: http://localhost:3000
- Opens automatically in your browser

## Quick Test

1. Access http://localhost:3000
2. Upload sample PDF resumes
3. Enter a job description
4. Click "Rank Resumes"
5. View the ranked results

## Troubleshooting

### Port Already in Use

If a port is already in use, you can change it:

**Backend**: Edit `backend/.env`
```
PORT=5001
```

**ML Service**: Edit `ml-service/.env`
```
PORT=8001
```

**Frontend**: Start with different port
```bash
cd frontend
PORT=3001 npm start
```

### Module Not Found Errors

Try clearing cache and reinstalling:

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# ML Service
cd ml-service
pip install --upgrade pip
pip install -r requirements.txt

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Python Issues

If you have both Python 2 and 3:
```bash
python3 -m pip install -r requirements.txt
```

Then run with:
```bash
python3 main.py
```

## Verifying Services

### Check Backend Health
```bash
curl http://localhost:5000/health
```

### Check ML Service Health
```bash
curl http://localhost:8000/health
```

## Common Issues

### ModuleNotFoundError: No module named 'fastapi'
```bash
cd ml-service
pip install -r requirements.txt
```

### npm ERR! command not found
- Ensure Node.js is installed: `node --version`
- Restart terminal after installation

### CORS Error in Browser Console
- Verify all 3 services are running
- Check that backend `.env` has correct ML_SERVICE_URL

## Production Deployment

For production use:

1. Set environment variables
2. Use production database
3. Enable authentication
4. Use process managers (PM2, systemd)
5. Configure reverse proxy (nginx)
6. Enable HTTPS

See README.md for more details.
