from database.models import Candidate


def get_ranked_candidates():

    candidates = Candidate.query.order_by(
        Candidate.resume_score.desc()
    ).all()

    return candidates