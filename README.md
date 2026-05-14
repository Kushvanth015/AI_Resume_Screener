# AI Powered Resume Screening System

An advanced AI-powered Applicant Tracking System (ATS) that automatically analyzes resumes, extracts skills, matches resumes with job descriptions, ranks candidates, and provides intelligent hiring insights through an interactive dashboard.

---

# Demo

https://github.com/user-attachments/assets/b4464dbd-787a-4836-a452-5e08fc9afd2c

---

# Features

## AI Resume Screening
- Upload multiple resumes at once
- Automatic PDF & DOCX parsing
- Resume text extraction
- AI-powered ATS scoring
- Semantic job description matching

---

## Skill Analysis
- AI skill extraction
- Matched skills detection
- Missing skills analysis
- Technical skill evaluation

---

## Candidate Ranking
- Automatic candidate ranking
- Shortlisted / Review / Rejected filtering
- ATS score visualization
- Real-time analytics dashboard

---

## Interactive Dashboard
- Pie chart analytics
- Bar chart candidate scores
- Resume statistics
- Candidate insights
- Recruiter-friendly UI

---

## Authentication System
- JWT Authentication
- Protected Routes
- Admin Dashboard
- Secure Login System

---

## AI HR Assistant
- Ask candidate-related questions
- Resume analysis chatbot
- AI hiring recommendations
- Candidate skill queries

---

## Report Generation
- Download ATS reports
- Candidate ranking reports
- Resume analytics export

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Recharts
- React Router DOM

---

## Backend
- Flask
- Flask JWT Extended
- Flask SQLAlchemy
- Flask Bcrypt
- Flask CORS

---

## AI / NLP
- Sentence Transformers
- Scikit-learn
- NLP Skill Extraction
- Semantic Similarity Matching

---

## Database
- SQLite

---

# Project Structure

```bash
AI_Resume_Screener/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── ai_engine/
│   │   ├── jd_matching/
│   │   ├── ranking/
│   │   └── skill_extraction/
│   │
│   ├── auth/
│   ├── chatbot/
│   ├── controllers/
│   ├── database/
│   ├── resume_parser/
│   ├── routes/
│   ├── uploads/
│   └── app.py
│
└── README.md
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/AI_Resume_Screener.git
```

```bash
cd AI_Resume_Screener
```

---

## 2. Frontend Setup

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 3. Backend Setup

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend server:

```bash
python app.py
```

Backend runs on:

```bash
https://ai-resume-screener-uhow.onrender.com
```

---

# Default Admin Login

```text
Email: admin@gmail.com
Password: 123456
```

---

# ATS Scoring Logic

The system calculates ATS scores using:

- Semantic similarity matching
- Required skill matching
- Resume quality analysis
- AI-based ranking engine

---

# Candidate Status Logic

| ATS Score | Status |
|---|---|
| 70+ | Shortlisted |
| 50–69 | Review |
| Below 50 | Rejected |

---

# AI HR Assistant Example Questions

```text
Who are shortlisted candidates?

Who are not shortlisted?

Why was Ajali rejected?

Who has strongest technical skills?

who knows machine learning

who knows react

who is under review
```

---

# Future Improvements

- OpenAI/Gemini powered chatbot
- Resume comparison mode
- Interview recommendation engine
- Email notifications
- Cloud deployment
- MongoDB/PostgreSQL integration
- Advanced recruiter analytics

---

# Author

## Kushvanth

AI/ML & Full Stack Developer

---

# License

This project is licensed under the MIT License.
