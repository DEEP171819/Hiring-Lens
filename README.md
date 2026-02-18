# HiringLens - ML-Based Resume Ranking System

An end-to-end system for ranking resumes based on job descriptions using Machine Learning and RAG (Retrieval-Augmented Generation).

## 🎯 Features

- **Resume Upload**: Upload multiple PDF resumes
- **Intelligent Ranking**: ML-based ranking using TF-IDF similarity matching
- **Job Description Matching**: Match resumes against specific job requirements
- **Real-time Results**: Ranked candidates with match scores
- **Simple & Free**: Uses only free, open-source libraries

## 📁 Project Structure

```
HiringLens/
├── frontend/          # React UI application
├── backend/           # Node.js Express API
├── ml-service/        # Python FastAPI ML service
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ (for frontend and backend)
- Python 3.8+ (for ML service)
- npm or yarn

### Installation

#### 1. Backend Setup

```bash
cd backend
npm install
```

Start the backend:
```bash
npm start
```

Backend runs on: `http://localhost:5000`

#### 2. ML Service Setup

```bash
cd ml-service
pip install -r requirements.txt
```

Start the ML service:
```bash
python main.py
```

ML Service runs on: `http://localhost:8000`

#### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend:
```bash
npm start
```

Frontend runs on: `http://localhost:3000`

## 📝 API Documentation

### Backend (Node.js Express)

#### POST `/upload-resumes`
Upload PDF resume files

**Request:**
```
Content-Type: multipart/form-data
- resumes: [File, File, ...]
```

**Response:**
```json
{
  "success": true,
  "message": "Resumes uploaded and processed",
  "count": 3,
  "resumes": [
    {
      "name": "resume_1.pdf",
      "text": "extracted resume text..."
    }
  ]
}
```

#### POST `/rank`
Rank resumes based on job description

**Request:**
```json
{
  "resumes": [
    {
      "name": "resume_1.pdf",
      "text": "resume content..."
    }
  ],
  "jobDescription": "Python Developer with 5+ years experience..."
}
```

**Response:**
```json
{
  "success": true,
  "ranked_resumes": [
    {
      "name": "resume_1.pdf",
      "text": "resume content...",
      "score": 92.5,
      "rank": 1
    },
    {
      "name": "resume_2.pdf",
      "text": "resume content...",
      "score": 78.3,
      "rank": 2
    }
  ]
}
```

#### GET `/health`
Health check endpoint

### ML Service (Python FastAPI)

#### POST `/process-resumes`
Extract text from PDF resumes

**Request:**
```json
{
  "file_paths": [
    "/path/to/resume1.pdf",
    "/path/to/resume2.pdf"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "resumes": [
    {
      "name": "resume1.pdf",
      "text": "extracted text..."
    }
  ]
}
```

#### POST `/rank`
Rank resumes using TF-IDF similarity

**Request:**
```json
{
  "resumes": [
    {
      "name": "resume_1.pdf",
      "text": "resume content..."
    }
  ],
  "job_description": "Senior Engineer..."
}
```

**Response:**
```json
{
  "success": true,
  "ranked_resumes": [
    {
      "name": "resume_1.pdf",
      "text": "resume content...",
      "score": 92.5,
      "rank": 1
    }
  ]
}
```

#### GET `/health`
Health check endpoint

## 🛠️ Tech Stack

### Frontend
- React 18
- Axios (HTTP client)
- CSS3 (responsive design)

### Backend
- Node.js
- Express.js
- Multer (file upload)
- Axios (HTTP client)

### ML Service
- FastAPI (Python web framework)
- PyPDF2 (PDF text extraction)
- scikit-learn (TF-IDF & similarity)
- Uvicorn (ASGI server)

## 📦 Dependencies

### Backend Dependencies
```
express@4.18.2
multer@1.4.5
axios@1.6.0
cors@2.8.5
dotenv@16.3.1
```

### ML Service Dependencies
```
fastapi==0.104.1
uvicorn==0.24.0
PyPDF2==3.0.1
scikit-learn==1.3.2
numpy==1.26.2
```

### Frontend Dependencies
```
react@18.2.0
react-dom@18.2.0
axios@1.6.0
```

## 🔄 Workflow

1. **Upload**: User uploads PDF resumes via the frontend
2. **Extract**: Backend receives files and sends to ML service for text extraction
3. **Process**: ML service extracts text from PDFs
4. **Rank**: User enters job description, clicks "Rank Resumes"
5. **Score**: ML service calculates TF-IDF similarity scores
6. **Display**: Frontend shows ranked candidates with scores

## 🧠 ML Algorithm

The system uses **TF-IDF (Term Frequency-Inverse Document Frequency)** with **Cosine Similarity** to rank resumes:

1. Vectorize job description and all resumes using TF-IDF
2. Calculate cosine similarity between job description and each resume
3. Normalize scores to 0-100 scale
4. Rank resumes by score (highest first)

### Score Interpretation
- **80+**: Excellent match
- **60-80**: Good match
- **Below 60**: Fair match

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
ML_SERVICE_URL=http://localhost:8000
```

### ML Service (.env)
```
PORT=8000
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process or change PORT in .env
```

### ML Service won't start
```bash
# Check Python version (must be 3.8+)
python --version

# Ensure all dependencies are installed
pip install -r requirements.txt

# Check if port 8000 is in use
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows
```

### Frontend won't start
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Start with a different port if 3000 is busy
PORT=3001 npm start
```

### CORS errors
Make sure all services are running and backend has correct ML_SERVICE_URL

## 🚧 Future Enhancements

- [ ] Advanced NLP models (BERT, GPT)
- [ ] Fairness metrics (demographic parity)
- [ ] Resume parsing with multiple formats
- [ ] Database for storing rankings
- [ ] User authentication
- [ ] Batch processing API
- [ ] Admin dashboard
- [ ] Resume quality scoring
- [ ] Skill extraction
- [ ] Experience level detection

## 📄 License

MIT

## 👥 Contributing

Contributions welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🙋 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for fair and efficient hiring
