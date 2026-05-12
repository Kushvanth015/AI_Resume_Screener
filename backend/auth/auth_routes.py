from flask import Blueprint, request, jsonify

from auth.auth_controller import (
    register_user,
    login_user
)

auth_bp = Blueprint(
    'auth_bp',
    __name__
)


# Register API
@auth_bp.route('/register', methods=['POST'])
def register():

    try:

        data = request.json

        response = register_user(data)

        return jsonify({
            "success": True,
            "message": response["message"]
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# Login API
@auth_bp.route('/login', methods=['POST'])
def login():

    try:

        data = request.json

        response = login_user(data)

        # Invalid credentials
        if not response:

            return jsonify({
                "success": False,
                "message": "Invalid Credentials"
            }), 401

        # Successful login
        return jsonify({
            "success": True,
            "token": response["token"],
            "username": response["username"]
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500