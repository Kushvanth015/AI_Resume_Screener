from chatbot.chat_memory import (
    analyzed_candidates
)


def find_candidate(query):

    query = query.lower()

    for candidate in analyzed_candidates:

        candidate_name = (
            candidate["name"]
            .lower()
            .replace(".pdf", "")
            .replace(".docx", "")
        )

        candidate_words = (
            candidate_name
            .replace("_", " ")
            .replace("-", " ")
            .split()
        )

        for word in candidate_words:

            if word in query:

                return candidate

    return None


def hr_chatbot(query):

    query = query.lower()

    # NO RESUMES
    if not analyzed_candidates:

        return (
            "No resumes analyzed yet."
        )

    # BEST CANDIDATE
    if (
        "best candidate" in query
        or
        "top candidate" in query
    ):

        best = max(
            analyzed_candidates,
            key=lambda x: x["score"]
        )

        return (

            f"The best candidate is "
            f"{best['name']} with ATS "
            f"score of {best['score']}%."
        )

    # HIGHEST SCORE
    if (
        "highest ats score" in query
        or
        "highest score" in query
    ):

        best = max(
            analyzed_candidates,
            key=lambda x: x["score"]
        )

        return (

            f"{best['name']} has the "
            f"highest ATS score of "
            f"{best['score']}%."
        )

    # STRONGEST TECHNICAL SKILLS
    if (
        "strongest technical skills" in query
        or
        "best technical skills" in query
        or
        "most technical skills" in query
    ):

        best_candidate = max(
            analyzed_candidates,
            key=lambda x: len(x["skills"])
        )

        return (

            f"{best_candidate['name']} "
            f"has the strongest technical "
            f"skill profile with skills in: "

            f"{', '.join(best_candidate['skills'])}."
        )
        
    # NOT SHORTLISTED
    if (
        "who are not shortlisted" in query
        or "not shortlisted candidates" in query
        or "who are not shortlisted candidates" in query
        or "who is not shortlisted" in query
        or "who got not shortlisted" in query
    ):

        not_shortlisted = [

            candidate["name"]

            for candidate in analyzed_candidates

            if candidate.get(
            "status", ""
            ).strip().lower() != "shortlisted"
        ]

        if len(not_shortlisted) == 0:

            return (
                "All candidates are shortlisted."
            )

        return (

            "Not shortlisted candidates: "

            + ", ".join(not_shortlisted)
        )

    # SHORTLISTED
    if (
        "who got shortlisted" in query
        or "shortlisted candidates" in query
        or "who is shortlisted" in query
        or "who are shortlisted" in query
        or "who got shortlisted candidates" in query
        or "who are shortlisted candidates" in query
    ):

        shortlisted = [

            candidate["name"]

            for candidate in analyzed_candidates

            if candidate.get(
            "status", ""
            ).strip().lower() == "shortlisted"
        ]   

        if len(shortlisted) == 0:

            return (
                "No candidates were shortlisted."
            )

        return (

            "Shortlisted candidates: "

            + ", ".join(shortlisted)
        )
        
    # REJECTED
    if (
        "who got rejected" in query
        or "rejected candidates" in query
        or "who was rejected" in query
        or "who is rejected" in query
        or "who are rejected" in query
    ):

        rejected = [

            candidate["name"]

            for candidate in analyzed_candidates

            if candidate.get(
            "status", ""
            ).strip().lower() == "rejected"
        ]

        if len(rejected) == 0:

            return (
                "No rejected candidates."
            )

        return (

            "Rejected candidates: "

            + ", ".join(rejected)
        )
    
    # REVIEW CANDIDATES
    if (
        "review candidates" in query
        or "who is under review" in query
        or "who is in review" in query
        or "who got review" in query
    ):

        review_candidates = [

            candidate["name"]

            for candidate in analyzed_candidates

            if candidate.get(
            "status", ""
            ).strip().lower() == "review"
        ]

        if len(review_candidates) == 0:

            return (
                "No review candidates."
            )

        return (

            "Review candidates: "

            + ", ".join(review_candidates)
        )

    # PYTHON SKILLS
    if "who knows python" in query:

        python_candidates = [

            candidate["name"]

            for candidate in analyzed_candidates

            if "python" in [

                skill.lower()

                for skill in candidate["skills"]
            ]
        ]

        if len(python_candidates) == 0:

            return (
                "No candidates know Python."
            )

        return (

            "Candidates with Python skills: "

            + ", ".join(python_candidates)
        )

    # REACT SKILLS
    if "who knows react" in query:

        react_candidates = [

            candidate["name"]

            for candidate in analyzed_candidates

            if "react" in [

                skill.lower()

                for skill in candidate["skills"]
            ]
        ]

        if len(react_candidates) == 0:

            return (
                "No candidates know React."
            )

        return (

            "Candidates with React skills: "

            + ", ".join(react_candidates)
        )

    # MACHINE LEARNING
    if (
        "who knows machine learning" in query
        or
        "who knows ai" in query
    ):

        ml_candidates = [

            candidate["name"]

            for candidate in analyzed_candidates

            if (

                "machine learning" in [

                    skill.lower()

                    for skill in candidate["skills"]
                ]

                or

                "deep learning" in [

                    skill.lower()

                    for skill in candidate["skills"]
                ]
            )
        ]

        if len(ml_candidates) == 0:

            return (
                "No AI/ML candidates found."
            )

        return (

            "AI/ML skilled candidates: "

            + ", ".join(ml_candidates)
        )

    # AVERAGE SCORE
    if "average ats score" in query:

        avg_score = sum(

            candidate["score"]

            for candidate in analyzed_candidates

        ) / len(analyzed_candidates)

        return (

            f"The average ATS score "
            f"is {round(avg_score, 2)}%."
        )

    # MOST COMMON SKILL
    if (
        "most common skill" in query
        or
        "top skill" in query
    ):

        all_skills = []

        for candidate in analyzed_candidates:

            all_skills.extend(
                candidate["skills"]
            )

        if len(all_skills) == 0:

            return (
                "No skills detected."
            )

        most_common = max(
            set(all_skills),
            key=all_skills.count
        )

        return (

            f"The most common skill "
            f"is {most_common}."
        )

    # FIND CANDIDATE
    candidate = find_candidate(query)

    if not candidate:

        return (
            "Candidate not found."
        )

    score = candidate["score"]

    status = candidate["status"]

    skills = candidate["skills"]

    matched_skills = candidate[
        "matched_skills"
    ]

    missing_skills = candidate[
        "missing_skills"
    ]

    # WHY STATUS
    if "why" in query:

        if status == "Shortlisted":

            return (

                f"{candidate['name']} "
                f"was shortlisted because "
                f"the ATS score was "
                f"{score}%. "

                f"Strong matching skills: "

                f"{', '.join(matched_skills)}."
            )

        elif status == "Review":

            return (

                f"{candidate['name']} "
                f"is under review because "
                f"the ATS score was "
                f"{score}%. "

                f"Matched Skills: "
                f"{', '.join(matched_skills)}. "

                f"Missing Skills: "
                f"{', '.join(missing_skills)}."
            )

        else:

            return (

                f"{candidate['name']} "
                f"was rejected because "
                f"the ATS score was only "
                f"{score}%. "

                f"Matched Skills: "
                f"{', '.join(matched_skills)}. "

                f"Missing Skills: "
                f"{', '.join(missing_skills)}."
            )

    # SKILLS
    if "skills" in query:

        return (

            f"{candidate['name']} "
            f"has these skills: "

            f"{', '.join(skills)}."
        )

    # SCORE
    if "score" in query:

        return (

            f"{candidate['name']} "
            f"received ATS score of "
            f"{score}%."
        )

    # MISSING SKILLS
    if (
        "missing" in query
        or
        "lacking" in query
        or        "what skills are missing" in query
        or        "what skills is missing" in query
        or        "what skills are lacking" in query
        or        "what skills is lacking" in query
        or "what skills are missing" in query
        or "what skills is missing" in query
    ):

        return (

            f"{candidate['name']} "
            f"is missing these skills: "

            f"{', '.join(missing_skills)}."
        )

    # STATUS
    if (
        "status" in query
        or
        "shortlisted" in query
        or
        "rejected" in query
    ):

        return (

            f"{candidate['name']} "
            f"status is "
            f"{status}."
        )

    return (

        "Ask about ATS score, "
        "skills, shortlist, rejection "
        "reason, missing skills, "
        "technical skills, or rankings."
    )