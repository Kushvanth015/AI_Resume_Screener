import spacy

from ai_engine.skill_extraction.skill_dataset import SKILLS

nlp = spacy.load("en_core_web_sm")


def detect_ai_skills(text):

    doc = nlp(text.lower())

    detected_skills = set()

    for token in doc:
        for skill in SKILLS:

            if skill.lower() in token.text:
                detected_skills.add(skill)

    return list(detected_skills)