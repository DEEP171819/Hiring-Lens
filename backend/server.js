const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

// Middleware
app.use(cors());
app.use(express.json());

// Setup multer for file uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Routes

/**
 * POST /upload-resumes
 * Upload PDF resumes and extract text
 */
app.post('/upload-resumes', upload.array('resumes', 50), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    console.log(`Received ${req.files.length} resume files`);

    const FormData = require('form-data');
    const form = new FormData();

    for (const file of req.files) {
      form.append('files', fs.createReadStream(file.path), {
        filename: file.originalname,
        contentType: file.mimetype
      });
    }

    const response = await axios.post(
      `${ML_SERVICE_URL}/upload-resumes`,
      form,
      {
        headers: form.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    res.json({
      success: true,
      message: 'Resumes uploaded and processed',
      count: req.files.length,
      resumes: response.data.resumes || []
    });

  } catch (error) {
    console.error(
      'Upload error:',
      error.response?.data || error.message
    );

    res.status(500).json({
      error: 'Failed to process resumes',
      details: error.response?.data || error.message
    });
  }
});

/**
 * POST /rank
 * Rank resumes based on job description
 */
app.post('/rank', async (req, res) => {
  try {
    const { resumes, job_description } = req.body;
    const jobDescription = job_description;

    if (!resumes || !jobDescription) {
      return res.status(400).json({ 
        error: 'Missing resumes or jobDescription' 
      });
    }

    // Send to ML service for ranking
    const response = await axios.post(`${ML_SERVICE_URL}/rank`, {
      resumes: resumes,
      job_description: jobDescription
    });

    res.json({
      success: true,
      ranked_resumes: response.data.ranked_resumes || []
    });
  } catch (error) {
    console.error('Ranking error:', error.message);
    res.status(500).json({ 
      error: 'Failed to rank resumes', 
      details: error.message 
    });
  }
});

/**
 * GET /health
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: error.message });
  }
  res.status(500).json({ error: error.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`ML Service URL: ${ML_SERVICE_URL}`);
});
