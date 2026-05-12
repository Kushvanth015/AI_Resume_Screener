from flask_bcrypt import Bcrypt

from database.models import User

from database.db_config import db

from auth.jwt_handler import generate_token

bcrypt = Bcrypt()


# Register User
def register_user(data):

    existing_user = User.query.filter_by(
        email=data['email']
    ).first()

    if existing_user:

        raise Exception(
            "Email already exists"
        )

    hashed_password = bcrypt.generate_password_hash(
        data['password']
    ).decode('utf-8')

    user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password
    )

    db.session.add(user)

    db.session.commit()

    return {
        "message": "User registered successfully"
    }


# Login User
def login_user(data):

    user = User.query.filter_by(
        email=data['email']
    ).first()

    if not user:
        return None

    password_valid = bcrypt.check_password_hash(
        user.password,
        data['password']
    )

    if not password_valid:
        return None

    token = generate_token(user)

    return {
        "token": token,
        "username": user.username
    }