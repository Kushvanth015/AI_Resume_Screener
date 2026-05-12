from flask import (
    Blueprint,
    request,
    jsonify
)

from chatbot.hr_chatbot import (
    hr_chatbot
)

chatbot_bp = Blueprint(
    "chatbot_bp",
    __name__
)


@chatbot_bp.route(
    "/chat",
    methods=["POST"]
)
def chat():

    data = request.json

    response = hr_chatbot(
        data["query"]
    )

    return jsonify({

        "response": response
    })