# HiringLens Project Summary

## ✅ Project Setup Complete

All folders, files, and configurations have been created for the HiringLens ML-Based Resume Ranking System.

---

## 📁 Final Project Structure

```
HiringLens/
├── frontend/                    # React UI Application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumePicker.js       # File upload component
│   │   │   ├── ResumePicker.css
│   │   │   ├── JobDescription.js     # Job description input
│   │   │   ├── JobDescription.css
│   │   │   ├── RankedResults.js      # Results display
│   │   │   └── RankedResults.css
│   │   ├── App.js                    # Main app component
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── .env                          # API URL config
│   └── .gitignore
│
├── backend/                     # Node.js + Express API
│   ├── server.js               # Express server with routes
│   ├── package.json            # Dependencies
│   ├── .env                    # Configuration
│   └── .gitignore
│
├── ml-service/                  # Python FastAPI ML Service
│   ├── main.py                 # FastAPI app with endpoints
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Configuration
│   └── .gitignore
│
├── README.md                    # Full documentation
├── INSTALLATION.md              # Setup instructions
├── setup.bat                    # Windows setup script
├── setup.sh                     # macOS/Linux setup script
├── .gitignore                   # Git ignore rules
└── SETUP_COMPLETE.md            # This file
```

---

## 📦 Package Installation Commands

### Backend Setup
```bash
cd backend
npm install
npm start
```

**Installed Packages:**
- express (web framework)
- multer (file uploads)
- axios (HTTP client)
- cors (cross-origin requests)
- dotenv (environment variables)

### ML Service Setup
```bash
cd ml-service
pip install -r requirements.txt
python main.py
```

**Installed Packages:**
- fastapi (web framework)
- uvicorn (ASGI server)
- PyPDF2 (PDF text extraction)
- scikit-learn (TF-IDF & similarity)
- python-multipart (file uploads)
- pydantic (data validation)
- numpy (numerical computing)

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

**Installed Packages:**
- react (UI library)
- react-dom (DOM rendering)
- react-scripts (build tools)
- axios (HTTP client)

---

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
setup.bat
```

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

1. **Install Backend:**
   ```bash
   cd backend && npm install
   ```

2. **Install ML Service:**
   ```bash
   cd ml-service && pip install -r requirements.txt
   ```

3. **Install Frontend:**
   ```bash
   cd frontend && npm install
   ```

### Running Services

Open 3 separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Runs on http://localhost:5000
```

**Terminal 2 - ML Service:**
```bash
cd ml-service
python main.py
# Runs on http://localhost:8000
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                          │
│                   (http://localhost:3000)                  │
│                                                             │
│  ├─ Upload Resumes (PDF)                                  │
│  ├─ Enter Job Description                                 │
│  └─ View Ranked Results                                   │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTP/REST
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                  Express Backend                            │
│               (http://localhost:5000)                      │
│                                                             │
│  ├─ POST /upload-resumes  (Multer file handling)          │
│  ├─ POST /rank            (Ranking request)               │
│  └─ GET /health           (Health check)                  │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTP/REST
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                   FastAPI ML Service                        │
│               (http://localhost:8000)                      │
│                                                             │
│  ├─ POST /process-resumes (PDF text extraction)           │
│  ├─ POST /rank            (TF-IDF similarity ranking)     │
│  └─ GET /health           (Health check)                  │
│                                                             │
│  ML Algorithm: TF-IDF + Cosine Similarity                 │
│  - Vectorize job description and resumes                  │
│  - Calculate similarity scores                            │
│  - Rank by score (0-100)                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Workflow

1. **User uploads PDF resumes** via frontend
2. **Backend receives files** via Multer
3. **Backend sends to ML Service** for text extraction
4. **ML Service extracts text** from PDFs using PyPDF2
5. **User enters job description** in frontend
6. **Backend sends ranking request** to ML Service
7. **ML Service calculates TF-IDF scores** for each resume
8. **ML Service ranks resumes** by similarity to job description
9. **Frontend displays ranked results** with match scores

---

## 🧠 ML Algorithm Details

### TF-IDF + Cosine Similarity

The system uses a proven information retrieval approach:

1. **Vectorization**: Convert text to numerical vectors using TF-IDF
   - TF (Term Frequency): How often a term appears in a document
   - IDF (Inverse Document Frequency): How unique a term is across documents

2. **Similarity Calculation**: Compute cosine similarity between vectors
   - Measures angle between vectors (0° = identical, 90° = orthogonal)
   - Range: 0.0 to 1.0

3. **Normalization**: Convert to 0-100 scale for readability
   - Formula: `score = (similarity + 1) / 2 * 100`

4. **Ranking**: Sort resumes by score (descending)

### Score Interpretation
- **80-100**: Excellent match (strong candidate)
- **60-79**: Good match (qualified candidate)
- **0-59**: Fair match (consider for specific skills)

---

## 📡 API Endpoints

### Backend Endpoints

#### Upload Resumes
```
POST /upload-resumes
Content-Type: multipart/form-data

Parameters:
- resumes: File[] (PDF files)

Response:
{
  "success": true,
  "message": "Resumes uploaded and processed",
  "count": 3,
  "resumes": [
    {
      "name": "john_resume.pdf",
      "text": "John Doe, Senior Developer..."
    }
  ]
}
```

#### Rank Resumes
```
POST /rank
Content-Type: application/json

Body:
{
  "resumes": [
    {
      "name": "john_resume.pdf",
      "text": "John Doe, Senior Developer..."
    }
  ],
  "jobDescription": "Looking for Python developer with 5+ years experience..."
}

Response:
{
  "success": true,
  "ranked_resumes": [
    {
      "name": "john_resume.pdf",
      "text": "John Doe, Senior Developer...",
      "score": 92.5,
      "rank": 1
    },
    {
      "name": "jane_resume.pdf",
      "text": "Jane Smith, Python Expert...",
      "score": 78.3,
      "rank": 2
    }
  ]
}
```

#### Health Check
```
GET /health

Response:
{
  "status": "Backend is running"
}
```

### ML Service Endpoints

#### Process Resumes
```
POST /process-resumes
Content-Type: application/json

Body:
{
  "file_paths": [
    "/path/to/resume1.pdf",
    "/path/to/resume2.pdf"
  ]
}

Response:
{
  "success": true,
  "count": 2,
  "resumes": [
    {
      "name": "resume1.pdf",
      "text": "extracted text from PDF..."
    }
  ]
}
```

#### Rank Resumes
```
POST /rank
Content-Type: application/json

Body:
{
  "resumes": [
    {
      "name": "resume1.pdf",
      "text": "resume content..."
    }
  ],
  "job_description": "Senior Python Engineer needed..."
}

Response:
{
  "success": true,
  "ranked_resumes": [
    {
      "name": "resume1.pdf",
      "text": "resume content...",
      "score": 92.5,
      "rank": 1
    }
  ]
}
```

#### Health Check
```
GET /health

Response:
{
  "status": "ML Service is running"
}
```

---

## 🎨 Frontend Components

### ResumePicker
- File input for selecting multiple PDF files
- Upload button triggers backend upload endpoint
- Shows loading state during upload

### JobDescription
- Textarea for entering job requirements
- Clear hint text for user guidance
- Auto-saves to state

### RankedResults
- Displays ranked resumes in card format
- Shows rank number, filename, match score
- Color-coded scores (green: 80+, yellow: 60-79, red: <60)
- Responsive design for mobile

### App
- Main component managing state
- Orchestrates workflow between components
- Error handling and user feedback

---

## ⚙️ Configuration

### Environment Variables

**Backend (.env)**
```
PORT=5000                          # Backend server port
ML_SERVICE_URL=http://localhost:8000  # ML service URL
```

**ML Service (.env)**
```
PORT=8000                          # ML service port
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000  # Backend API URL
```

---

## 🚨 Troubleshooting

### Port Conflicts
If ports are already in use, change them:
- Backend: Edit `backend/.env` and set `PORT=5001`
- ML Service: Edit `ml-service/.env` and set `PORT=8001`
- Frontend: Run with `PORT=3001 npm start`

### Module Not Found
```bash
# Clear and reinstall
rm -rf node_modules
npm install
```

### CORS Errors
- Verify all 3 services are running
- Check backend `.env` has correct `ML_SERVICE_URL`
- Restart all services

### PDF Extraction Issues
- Ensure files are valid PDFs
- Check file permissions
- Verify PyPDF2 is installed: `pip install PyPDF2`

---

## 📚 Technology Stack Summary

| Component | Tech Stack | Purpose |
|-----------|-----------|---------|
| Frontend | React, CSS3, Axios | User interface |
| Backend | Node.js, Express, Multer | API & file handling |
| ML Service | Python, FastAPI, scikit-learn | Resume processing & ranking |
| PDF Parsing | PyPDF2 | Extract text from PDFs |
| ML Algorithm | TF-IDF + Cosine Similarity | Rank resumes |

---

## ✨ Key Features

✅ **Multi-resume upload** - Upload multiple PDFs at once
✅ **Instant ranking** - Fast TF-IDF based matching
✅ **Fair scoring** - All resumes scored on same criteria
✅ **Score visibility** - Match scores 0-100 scale
✅ **Responsive UI** - Works on desktop and mobile
✅ **Open source** - All free libraries
✅ **No cloud dependencies** - Runs fully locally
✅ **Production ready** - Proper error handling & validation

---

## 🔄 Next Steps

1. **Review README.md** for complete documentation
2. **Run setup script** to install dependencies
3. **Start all 3 services** in separate terminals
4. **Test the application** at http://localhost:3000
5. **Upload sample resumes** and test ranking
6. **Customize as needed** for your use case

---

## 📝 Notes

- All code is written for clarity and hackathon readiness
- Comments explain key functionality
- Error handling implemented throughout
- Scalable architecture for future enhancements
- No paid APIs or cloud services required

---

## 🎓 Learning Resources

- **FastAPI**: https://fastapi.tiangolo.com/
- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/
- **scikit-learn**: https://scikit-learn.org/
- **TF-IDF**: https://en.wikipedia.org/wiki/Tf%E2%80%93idf

---

**Status**: ✅ Project Setup Complete
**Date**: January 2026
**Version**: 1.0.0 (Initial Release)
