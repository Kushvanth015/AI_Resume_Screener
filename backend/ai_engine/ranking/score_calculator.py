def calculate_final_score(

    similarity_score,

    matched_skills,

    total_skills,

    resume_skills
):

    # Required Skill Match %
    if total_skills == 0:

        skill_match_score = 0

    else:

        skill_match_score = (

            len(matched_skills)
            / total_skills

        ) * 100

    # Resume Quality Score
    resume_quality_score = min(

        len(resume_skills) * 2,

        100
    )

    # FINAL ATS SCORE
    final_score = (

        # Semantic JD Matching
        (0.45 * similarity_score)

        +

        # Required Skills Match
        (0.45 * skill_match_score)

        +

        # Resume Strength
        (0.10 * resume_quality_score)
    )

    return round(
        min(final_score, 100),
        2
    )