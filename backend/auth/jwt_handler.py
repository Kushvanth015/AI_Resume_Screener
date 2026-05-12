import datetime

from flask_jwt_extended import (
    create_access_token
)


def generate_token(user):

    # Additional JWT payload data
    additional_claims = {

        "id": user.id,

        "email": user.email,

        "role": user.role
    }

    # Create JWT token
    token = create_access_token(

        identity=str(user.id),

        additional_claims=additional_claims,

        expires_delta=datetime.timedelta(days=1)
    )

    return token