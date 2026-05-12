import os

from resume_parser.pdf_parser import extract_text_from_pdf
from resume_parser.docx_parser import extract_text_from_docx
from resume_parser.text_cleaner import clean_resume_text



def parse_resume(file_path):
    extension = os.path.splitext(file_path)[1].lower()

    extracted_text = ""

    if extension == '.pdf':
        extracted_text = extract_text_from_pdf(file_path)

    elif extension == '.docx':
        extracted_text = extract_text_from_docx(file_path)

    cleaned_text = clean_resume_text(extracted_text)

    return cleaned_text