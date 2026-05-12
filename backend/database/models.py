from database.db_config import db


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(100))

    email = db.Column(db.String(150), unique=True)

    password = db.Column(db.String(300))

    role = db.Column(db.String(50), default="user")


class Candidate(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    candidate_name = db.Column(db.String(200))

    email = db.Column(db.String(200))

    skills = db.Column(db.Text)

    experience = db.Column(db.String(100))

    resume_score = db.Column(db.Float)

    summary = db.Column(db.Text)

    resume_path = db.Column(db.String(300))