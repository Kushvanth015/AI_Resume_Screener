import os

from werkzeug.utils import secure_filename

from resume_parser.pdf_parser import (
    extract_text_from_pdf
)

from resume_parser.docx_parser import (
    extract_text_from_docx
)

from ai_engine.skill_extraction.skill_extractor import (
    extract_skills
)

from ai_engine.jd_matching.similarity_model import (
    calculate_similarity
)

from ai_engine.ranking.score_calculator import (
    calculate_final_score
)

from ai_engine.ranking.ranking_engine import (
    rank_candidates
)

from chatbot.chat_memory import (
    analyzed_candidates
)

UPLOAD_FOLDER = "uploads"


def analyze_resumes(
    files,
    job_description
):

    global analyzed_candidates

    candidates = []

    # Extract JD Skills
    jd_skills = extract_skills(
        job_description
    )

    for file in files:

        filename = secure_filename(
            file.filename
        )

        filepath = os.path.join(
            UPLOAD_FOLDER,
            filename
        )

        # Save Resume
        file.save(filepath)

        # Extract Resume Text
        if filename.lower().endswith(".pdf"):

            resume_text = extract_text_from_pdf(
                filepath
            )

        elif filename.lower().endswith(".docx"):

            resume_text = extract_text_from_docx(
                filepath
            )

        else:

            continue

        # Extract Resume Skills
        resume_skills = extract_skills(
            resume_text
        )

        # Matched Skills
        matched_skills = list(

            set(resume_skills)
            &
            set(jd_skills)
        )

        # Missing Skills
        missing_skills = list(

            set(jd_skills)
            -
            set(resume_skills)
        )

        # AI Similarity Score
        similarity_score = float(

            calculate_similarity(

                resume_text,

                job_description
            )
        )

        # Final ATS Score
        final_score = float(

             calculate_final_score(

                 similarity_score,

                 matched_skills,

                 len(jd_skills),

                 resume_skills
            )
        )

        # Candidate Status
        if final_score >= 70:

            status = "Shortlisted"

        elif final_score >= 50:

            status = "Review"

        else:

            status = "Rejected"

        # Candidate Data
        candidate = {

            "name": filename,

            "score": round(final_score, 2),

            "similarity_score": round(
                similarity_score,
                2
            ),

            "skills": resume_skills,

            "matched_skills": matched_skills,

            "missing_skills": missing_skills,

            "status": status,

            "resume_text": resume_text
        }

        candidates.append(candidate)

    # Rank Candidates
    ranked_candidates = rank_candidates(
        candidates
    )
    
    print(ranked_candidates)

    # Chat Memory
    analyzed_candidates.clear()

    analyzed_candidates.extend(
        ranked_candidates
    )

    return ranked_candidates