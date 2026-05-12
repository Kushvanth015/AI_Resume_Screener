from ai_engine.skill_extraction.skill_dataset import SKILLS


# Normalize duplicate skill names
SKILL_ALIASES = {

    "ml": "machine learning",

    "dl": "deep learning",

    "nlp": "natural language processing",

    "js": "javascript"
}


def extract_skills(resume_text):

    resume_text = resume_text.lower()

    extracted_skills = []

    # Extract skills
    for skill in SKILLS:

        if skill.lower() in resume_text:

            extracted_skills.append(skill)

    # Normalize skills
    normalized_skills = []

    for skill in extracted_skills:

        skill_lower = skill.lower()

        if skill_lower in SKILL_ALIASES:

            normalized_skills.append(

                SKILL_ALIASES[skill_lower]
            )

        else:

            normalized_skills.append(
                skill_lower
            )

    return list(set(normalized_skills))