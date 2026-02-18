from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from typing import List
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import PyPDF2
import io
import spacy
from skills import SKILL_SYNONYMS
nlp = spacy.load("en_core_web_sm")





load_dotenv()

app = FastAPI(title="HiringLens ML Service", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Resume(BaseModel):
    name: str
    text: str

class ProcessResumesRequest(BaseModel):
    file_paths: List[str]

class RankRequest(BaseModel):
    resumes: List[Resume]
    job_description: str

class RankedResume(BaseModel):
    name: str
    text: str
    score: float
    rank: int
    matched_keywords: List[str]
    explanation: str
    missing_skills: List[str]
    decision: str
    decision_reason: str
    audit_summary: str

# Utility functions

def extract_text_from_pdf(file_path: str) -> str:
    try:
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            text = ""
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text
        return text
    except Exception as e:
        print("PDF ERROR:", e)
        return ""


def extract_skill_keywords(text: str) -> set:
    skills = set()
    text = text.lower()
    for canonical, synonyms in SKILL_SYNONYMS.items():
        if canonical in text:
            skills.add(canonical)
        for s in synonyms:
            if s in text:
                skills.add(canonical)
    return skills

def extract_text_from_upload(file: UploadFile) -> str:
    """Extract text from uploaded PDF file."""
    try:
        content = file.file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text

        return text
    except Exception as e:
        print(f"Error reading uploaded PDF {file.filename}: {e}")
        return ""

import spacy
nlp = spacy.load("en_core_web_sm")

def preprocess_text(text: str) -> str:
    """
    Lemmatize and normalize text for robust TF-IDF matching.
    """
    doc = nlp(text.lower())
    tokens = [
        token.lemma_
        for token in doc
        if token.is_alpha and not token.is_stop
    ]
    return " ".join(tokens)

def get_top_keywords(tfidf_vector, feature_names, top_k=10):
    indices = np.argsort(tfidf_vector)[-top_k:]
    return [feature_names[i] for i in indices if tfidf_vector[i] > 0]

def expand_skills(text: str) -> str:
    text = text.lower()
    expanded = text

    for canonical, synonyms in SKILL_SYNONYMS.items():
        if canonical in text:
            expanded += f" {' '.join([canonical]*6)}"  # HARD boost
        for word in synonyms:
            if word in text:
                expanded += f" {' '.join([canonical]*4)}"

    return expanded

def skill_coverage_score(job_desc: str, resume_text: str) -> float:
    job_skills = extract_skill_keywords(job_desc)
    resume_skills = extract_skill_keywords(resume_text)

    if not job_skills:
        return 0.0

    return len(job_skills & resume_skills) / len(job_skills)


def prioritize_sections(text: str) -> str:
    keywords = ["skill", "project", "experience", "achievement"]
    chunks = []
    for k in keywords:
        if k in text.lower():
            idx = text.lower().find(k)
            chunks.append(text[idx:idx+1500])
    return " ".join(chunks)[:6000]



def calculate_similarity(resumes: List[str], job_description: str):
    try:
        # 🔹 Preprocess + expand skills
        processed_job = preprocess_text(expand_skills(job_description))
        processed_resumes = [
            preprocess_text(expand_skills(r)) for r in resumes
        ]

        documents = [processed_job] + processed_resumes

        vectorizer = TfidfVectorizer(
            ngram_range=(1, 3),
            max_features=3000
        )

        tfidf_matrix = vectorizer.fit_transform(documents)

        similarities = cosine_similarity(
            tfidf_matrix[0:1],
            tfidf_matrix[1:]
        )[0]

        # 🔹 Human-readable normalization
        def normalize_score(cosine_score: float, jd_length: int) -> float:
            if cosine_score <= 0:
                return 0.0

            # Short JD boost
            if jd_length < 40:
                score = cosine_score * 300
            else:
                score = (cosine_score ** 0.5) * 100

            return min(100.0, round(score, 2))

        jd_length = len(processed_job.split())
        scores = [
            normalize_score(score, jd_length)
            for score in similarities
        ]

        return scores, vectorizer, tfidf_matrix

    except Exception as e:
        print("TF-IDF ERROR:", e)
        return [0.0] * len(resumes), None, None

# Endpoints

@app.get("/")
def root():
    return {"message": "Welcome to HiringLens ML Service"}


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "ML Service is running"}

@app.post("/process-resumes", response_model=dict)
async def process_resumes(request: ProcessResumesRequest):
    """
    Process PDF resumes and extract text.
    """
    try:
        resumes = []
        for file_path in request.file_paths:
            if not os.path.exists(file_path):
                print(f"File not found: {file_path}")
                continue
            
            text = extract_text_from_pdf(file_path)
            if text:
                resume_name = os.path.basename(file_path)
                resumes.append({
                    "name": resume_name,
                    "text": text[:1000]  # Store first 1000 chars
                })
        
        return {
            "success": True,
            "count": len(resumes),
            "resumes": resumes
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload-resumes", response_model=dict)
async def upload_resumes(files: List[UploadFile] = File(...)):
    try:
        resumes = []

        for file in files:
            if not file.filename.lower().endswith(".pdf"):
                continue

            text = extract_text_from_upload(file)

            if text.strip():
                resumes.append({
                    "name": file.filename,
                    "text": prioritize_sections(text)
                })

        return {
            "success": True,
            "count": len(resumes),
            "resumes": resumes
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/rank", response_model=dict)
async def rank_resumes(request: RankRequest):
    try:
        if not request.resumes or not request.job_description:
            raise HTTPException(status_code=400, detail="Missing resumes or job_description")

        resume_texts = [resume.text for resume in request.resumes]

        scores, vectorizer, tfidf_matrix = calculate_similarity(
            resume_texts, request.job_description
        )

        if vectorizer is None:
            raise HTTPException(status_code=500, detail="Failed to process documents")

        feature_names = vectorizer.get_feature_names_out()

        # 🔹 Job keywords (top weighted only)
        job_tfidf = tfidf_matrix[0].toarray().flatten()

        # top TF-IDF keywords
        job_keywords = set(
            get_top_keywords(job_tfidf, feature_names, top_k=15)
        )

    

        # force skill keywords
        skill_keywords = extract_skill_keywords(request.job_description)
        job_keywords = job_keywords.union(skill_keywords)

        if len(job_keywords) < 5:
            job_keywords = job_keywords.union(skill_keywords)


        ranked_data = []

        for i, resume in enumerate(request.resumes):
            resume_tfidf = tfidf_matrix[i + 1].toarray().flatten()
            resume_keywords = set(
                get_top_keywords(resume_tfidf, feature_names, top_k=25)
            )

            resume_skill_keywords = extract_skill_keywords(resume.text)
            resume_keywords = resume_keywords.union(resume_skill_keywords)


            matched_keywords = list(job_keywords & resume_keywords)
            missing_skills = list(job_keywords - resume_keywords)

            # 🔹 Bias logic (IMPORTANT FIX)
            bias_flag = False
            if scores[i] >= 40 and len(matched_keywords) >= 2:
                bias_flag = fairness_metrics(
                    score=scores[i],
                    matched_keywords=matched_keywords
                )

            # 🔹 Decision logic (unchanged but now reliable)
            if scores[i] >= 70 and len(missing_skills) <= 2:
                decision = "Shortlist"
                decision_reason = "Strong alignment with job requirements."
            elif scores[i] >= 40:
                decision = "Review"
                decision_reason = "Partial alignment; needs recruiter review."
            else:
                decision = "Reject"
                decision_reason = "Insufficient skill alignment."

            explanation = (
                f"The resume shows semantic alignment with the job description, "
                f"resulting in a {round(scores[i], 1)}% similarity score."
            )

            semantic = scores[i] / 100  # normalize
            skill_cov = skill_coverage_score(request.job_description, resume.text)
            keyword_overlap = len(matched_keywords) / max(len(job_keywords), 1)

            final_score = (
                0.55 * semantic +
                0.30 * skill_cov +
                0.15 * keyword_overlap
            ) * 100


            ranked_data.append({
                "name": resume.name,
                "text": resume.text,
                "score": round(final_score, 2),
                "rank": None,
                "matched_keywords": matched_keywords,
                "missing_skills": missing_skills,
                "bias_flag": bias_flag,
                "decision": decision,
                "decision_reason": decision_reason,
                "explanation": explanation,
                "audit_summary": (
                    f"Matched {len(matched_keywords)} key skills, "
                    f"missing {len(missing_skills)} important skills. "
                    f"Decision: {decision}."
                )
            })

        ranked_data.sort(key=lambda x: x["score"], reverse=True)

        for idx, item in enumerate(ranked_data, start=1):
            item["rank"] = idx

        return {
            "success": True,
            "ranked_resumes": ranked_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def fairness_metrics(score: float, matched_keywords: list) -> bool:
    """
    Bias is flagged ONLY if:
    - Resume has sufficient skill overlap
    - But similarity score is unexpectedly low
    """
    if len(matched_keywords) >= 3 and score < 55:
        return True
    return False


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
