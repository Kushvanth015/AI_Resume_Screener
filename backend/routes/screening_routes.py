from flask import (
    Blueprint,
    request,
    jsonify
)

from controllers.screening_controller import (
    analyze_resumes
)

screening_bp = Blueprint(
    'screening_bp',
    __name__
)


@screening_bp.route(
    '/analyze-resumes',
    methods=['POST']
)
def analyze_resume_route():

    files = request.files.getlist(
        'resumes'
    )

    job_description = request.form.get(
        'job_description'
    )

    if not files:

        return jsonify({
            "message": "No resumes uploaded"
        }), 400

    results = analyze_resumes(
        files,
        job_description
    )

    return jsonify({
        "candidates": results
    })