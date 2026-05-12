from ai_engine.jd_matching.similarity_model import (
    ResumeSimilarityModel
)

similarity_model = ResumeSimilarityModel()


def calculate_similarity(
    resume_text,
    job_description
):

    return similarity_model.calculate_similarity(
        resume_text,
        job_description
    )