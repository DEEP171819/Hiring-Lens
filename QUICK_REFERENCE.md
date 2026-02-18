# HiringLens - Quick Reference Guide

## 🚀 Start Services (3 Terminal Windows)

### Terminal 1: Backend
```bash
cd backend
npm start
```
📍 http://localhost:5000

### Terminal 2: ML Service
```bash
cd ml-service
python main.py
```
📍 http://localhost:8000

### Terminal 3: Frontend
```bash
cd frontend
npm start
```
📍 http://localhost:3000

---

## 📋 First Time Setup

```bash
# Windows
setup.bat

# macOS/Linux
chmod +x setup.sh
./setup.sh
```

---

## 🧪 Test the API

### Backend Health
```bash
curl http://localhost:5000/health
```

### ML Service Health
```bash
curl http://localhost:8000/health
```

---

## 📁 Directory Structure

```
HiringLens/
├── backend/       ← Node.js API server
├── frontend/      ← React UI app
├── ml-service/    ← Python ML service
├── README.md      ← Full documentation
└── INSTALLATION.md ← Setup instructions
```

---

## ⚙️ Configuration

| Service | Config File | Key Variable |
|---------|------------|--------------|
| Backend | `backend/.env` | `PORT`, `ML_SERVICE_URL` |
| ML | `ml-service/.env` | `PORT` |
| Frontend | `frontend/.env` | `REACT_APP_API_URL` |

---

## 🔧 Commands Reference

### Backend
```bash
cd backend
npm install        # Install dependencies
npm start          # Start server
```

### ML Service
```bash
cd ml-service
pip install -r requirements.txt   # Install dependencies
python main.py                    # Start service
```

### Frontend
```bash
cd frontend
npm install        # Install dependencies
npm start          # Start dev server
npm build          # Create production build
```

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change `backend/.env` PORT to 5001 |
| Port 8000 in use | Change `ml-service/.env` PORT to 8001 |
| Port 3000 in use | Run `PORT=3001 npm start` in frontend |
| Module not found | Run `npm install` or `pip install -r requirements.txt` |
| CORS error | Verify all 3 services running and correct URLs |

---

## 📊 API Quick Reference

### Upload Resumes
```bash
curl -X POST http://localhost:5000/upload-resumes \
  -F "resumes=@resume1.pdf" \
  -F "resumes=@resume2.pdf"
```

### Rank Resumes
```bash
curl -X POST http://localhost:5000/rank \
  -H "Content-Type: application/json" \
  -d '{
    "resumes": [{"name": "resume.pdf", "text": "content..."}],
    "jobDescription": "Senior Developer wanted..."
  }'
```

---

## 💡 Tips

- ✅ Start all 3 services before testing
- ✅ Check .env files for correct URLs
- ✅ Use separate terminal windows for each service
- ✅ Clear browser cache if UI doesn't update
- ✅ Check browser console for errors
- ✅ Verify PDFs are readable text (not scanned images)

---

## 📚 Documentation Files

- **README.md** - Complete project documentation
- **INSTALLATION.md** - Detailed setup instructions
- **SETUP_COMPLETE.md** - Full setup summary
- **QUICK_REFERENCE.md** - This file

---

## 🎯 Workflow

1. Upload PDFs via frontend
2. Enter job description
3. Click "Rank Resumes"
4. View ranked results with scores

---

## 🏃 Production Deployment

- Set environment variables for production URLs
- Use PM2 or systemd for process management
- Configure nginx/Apache reverse proxy
- Enable HTTPS
- Add database for persistence
- Implement user authentication

---

## 📞 Need Help?

1. Check INSTALLATION.md for detailed setup
2. Review README.md for API documentation
3. Verify all environment variables
4. Ensure all 3 services are running
5. Check browser console for errors
6. Check service console logs for backend errors

---

**Happy Ranking! 🎉**
