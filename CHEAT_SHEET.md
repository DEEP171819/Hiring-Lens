# 🎯 HiringLens - Command Cheat Sheet

## 📍 Project Location
```
d:\My Projects\HiringLens\
```

---

## 🚀 QUICK START (Pick One)

### Option A: Automated Setup (Recommended)
```bash
# Windows
setup.bat

# macOS/Linux
chmod +x setup.sh
./setup.sh
```

### Option B: Manual Setup
```bash
# Backend
cd backend && npm install

# ML Service
cd ml-service && pip install -r requirements.txt

# Frontend
cd frontend && npm install
```

---

## ▶️ START SERVICES (3 Terminal Windows)

### Terminal 1: Backend API
```bash
cd backend
npm start
```
→ http://localhost:5000

### Terminal 2: ML Service
```bash
cd ml-service
python main.py
```
→ http://localhost:8000

### Terminal 3: Frontend UI
```bash
cd frontend
npm start
```
→ http://localhost:3000

---

## 🧪 API TESTS

### Backend Health
```bash
curl http://localhost:5000/health
```

### ML Service Health
```bash
curl http://localhost:8000/health
```

### Upload Resumes (Frontend handles this)
```bash
curl -X POST http://localhost:5000/upload-resumes \
  -F "resumes=@resume1.pdf" \
  -F "resumes=@resume2.pdf"
```

### Rank Resumes (Frontend handles this)
```bash
curl -X POST http://localhost:5000/rank \
  -H "Content-Type: application/json" \
  -d '{
    "resumes": [
      {"name": "resume1.pdf", "text": "content..."}
    ],
    "jobDescription": "Senior Developer..."
  }'
```

---

## 🔧 CONFIGURATION

### Change Backend Port
**File:** `backend/.env`
```
PORT=5001
```

### Change ML Service Port
**File:** `ml-service/.env`
```
PORT=8001
```

### Change Frontend Port
```bash
cd frontend
PORT=3001 npm start
```

### Change Backend API URL
**File:** `frontend/.env`
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🐛 TROUBLESHOOTING

### Port Already in Use
```bash
# Find process on port
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill process (Windows)
taskkill /PID <PID> /F
```

### Clear Cache & Reinstall
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install

# ML Service
cd ml-service
pip install --upgrade pip
pip install -r requirements.txt
```

### Module Not Found
```bash
# Backend
npm install

# ML Service
pip install -r requirements.txt

# Frontend
npm install
```

### CORS Errors
1. Verify all 3 services running
2. Check `backend/.env` has correct `ML_SERVICE_URL`
3. Restart all services

---

## 📁 FOLDER NAVIGATION

```bash
# Go to project root
cd d:\My Projects\HiringLens

# Go to backend
cd backend

# Go to ML service
cd ml-service

# Go to frontend
cd frontend

# Back to root from any subfolder
cd ..
```

---

## 📄 DOCUMENTATION FILES

Read in this order:
1. **00_START_HERE.md** ← Start here
2. **QUICK_REFERENCE.md** ← Commands & APIs
3. **README.md** ← Full documentation
4. **INSTALLATION.md** ← Setup details
5. **VERIFICATION.md** ← Checklist

---

## 🎨 FRONTEND WORKFLOW

1. Open http://localhost:3000
2. Click "📤 Select PDF Resumes"
3. Select one or more PDF files
4. Wait for upload confirmation
5. Enter job description
6. Click "Rank Resumes"
7. View results with match scores

---

## 🔄 DATA FLOW

```
Browser (3000)
    ↓ Upload PDFs
    ↓
Backend (5000)
    ↓ Send to ML Service
    ↓
ML Service (8000)
    ↓ Extract text & rank
    ↓
Backend (5000)
    ↓ Return results
    ↓
Browser (3000)
    ↓ Display results
```

---

## 📊 SCORE INTERPRETATION

- **80-100** 🟢 Excellent match
- **60-79** 🟡 Good match
- **0-59** 🔴 Fair match

---

## 🎯 QUICK STATUS CHECK

### Is Backend Running?
```bash
curl http://localhost:5000/health
# Expected: {"status": "Backend is running"}
```

### Is ML Service Running?
```bash
curl http://localhost:8000/health
# Expected: {"status": "ML Service is running"}
```

### Is Frontend Running?
```bash
# Open browser: http://localhost:3000
# Should see HiringLens title and upload button
```

---

## 💾 FILE LOCATIONS

**Backend**
- Server: `backend/server.js`
- Config: `backend/.env`
- Uploads: `backend/uploads/`

**ML Service**
- App: `ml-service/main.py`
- Config: `ml-service/.env`
- Requirements: `ml-service/requirements.txt`

**Frontend**
- Main: `frontend/src/App.js`
- Config: `frontend/.env`
- Components: `frontend/src/components/`

---

## 🔍 COMMON TASKS

### View Backend Logs
```bash
# Terminal shows logs directly
# Check for errors during upload/ranking
```

### View ML Service Logs
```bash
# Terminal shows logs directly
# Check for PDF extraction issues
```

### View Frontend Logs
```bash
# Check browser console (F12)
# Check for API errors
```

### Reset Everything
```bash
# Stop all services (Ctrl+C in each terminal)
# Delete uploads
rm -rf backend/uploads

# Restart all services
```

---

## 🚀 PRODUCTION CHECKLIST

- [ ] Test with multiple PDFs
- [ ] Test with different job descriptions
- [ ] Verify ranking accuracy
- [ ] Test error cases
- [ ] Check performance
- [ ] Review logs
- [ ] Add database if needed
- [ ] Add authentication if needed
- [ ] Deploy to server

---

## 📱 RESPONSIVE DESIGN

Frontend works on:
- ✅ Desktop (1920x1080+)
- ✅ Tablet (768x1024)
- ✅ Mobile (320x568+)

All interfaces adapt to screen size.

---

## 🔐 SECURITY

All files:
- ✅ Validated on upload
- ✅ PDF format only
- ✅ No external API calls
- ✅ Local processing only
- ✅ Environment variables for config

---

## 📚 FILE TYPES

**JavaScript Files**
- App.js, components, index.js

**Python Files**
- main.py (FastAPI server)

**CSS Files**
- App.css, component CSS files

**Config Files**
- package.json, requirements.txt, .env

**Docs Files**
- README.md, INSTALLATION.md, etc.

---

## ✨ TIPS & TRICKS

1. **Multi-terminal setup** - Use VS Code integrated terminal or tmux
2. **Live reload** - Changes to code auto-reload (frontend & services)
3. **API testing** - Use Postman or curl for API testing
4. **Browser DevTools** - F12 to debug frontend
5. **Sample PDFs** - Create test PDFs with resume-like text

---

## 🎓 LEARNING PATHS

**Beginner**: Read → Install → Run → Observe
**Intermediate**: Modify → Test → Extend → Deploy
**Advanced**: Add DB → Auth → Docker → Cloud

---

## ⏱️ TIMING GUIDE

| Task | Time |
|------|------|
| Setup | 5-10 min |
| Start services | 1 min |
| First test | 5 min |
| Full demo | 10 min |

---

## 🎯 SUCCESS INDICATORS

✅ All terminals show "running" messages
✅ http://localhost:3000 loads in browser
✅ Upload button visible
✅ Can select PDF files
✅ Can enter job description
✅ Can click "Rank Resumes"
✅ Results display with scores

---

## 📞 EMERGENCY REFERENCE

| Problem | Solution |
|---------|----------|
| Nothing loads | Are all 3 services running? |
| Port error | Change PORT in .env |
| Upload fails | Check PDF file format |
| Ranking fails | Check ML service running |
| Slow | Check network, try smaller PDFs |

---

## 🎉 YOU'RE READY!

Everything is set up and working. This cheat sheet has everything you need.

**Good luck! 🚀**

---

**Last Updated**: January 28, 2026
**Status**: ✅ Complete
**Version**: 1.0
