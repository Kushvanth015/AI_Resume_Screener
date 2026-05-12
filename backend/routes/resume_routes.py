import os

from flask import Blueprint, request, jsonify

from utils.file_handler import allowed_file, save_file
from resume_parser.parser_utils import parse_resume

resume_bp = Blueprint('resume_bp', __name__)

UPLOAD_FOLDER = 'uploads'

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@resume_bp.route('/upload-resume', methods=['POST'])
def upload_resume():

    if 'resume' not in request.files:
        return jsonify({
            'success': False,
            'message': 'No file uploaded'
        }), 400

    file = request.files['resume']

    if file.filename == '':
        return jsonify({
            'success': False,
            'message': 'Empty filename'
        }), 400

    if not allowed_file(file.filename):
        return jsonify({
            'success': False,
            'message': 'Only PDF and DOCX allowed'
        }), 400

    file_path = save_file(file, UPLOAD_FOLDER)

    extracted_text = parse_resume(file_path)

    return jsonify({
        'success': True,
        'filename': file.filename,
        'extracted_text': extracted_text
    })