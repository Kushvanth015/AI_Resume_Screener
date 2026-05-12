from flask import Flask
from flask_cors import CORS
from database.models import User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from database.db_config import db

from routes.resume_routes import resume_bp
from routes.screening_routes import screening_bp
from routes.dashboard_routes import dashboard_bp
from routes.chatbot_routes import chatbot_bp
from auth.auth_routes import auth_bp

app = Flask(__name__)

# Enable CORS
CORS(app)

# Upload Settings
app.config['UPLOAD_FOLDER'] = 'uploads'

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# SQLite Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT Secret Key
app.config["JWT_SECRET_KEY"] = "AI_Resume_Screener_Super_Secret_JWT_Key_2026"

# Initialize JWT
jwt = JWTManager(app)

# Initialize Database
db.init_app(app)

# Create Tables
bcrypt = Bcrypt(app)

with app.app_context():

    db.create_all()

    admin_exists = User.query.filter_by(
        email="admin@gmail.com"
    ).first()

    if not admin_exists:

        hashed_password = bcrypt.generate_password_hash(
            "123456"
        ).decode("utf-8")

        admin = User(
            username="admin",
            email="admin@gmail.com",
            password=hashed_password,
            role="admin"
        )

        db.session.add(admin)

        db.session.commit()

        print("Default admin created successfully")

# Register Blueprints
app.register_blueprint(resume_bp)

app.register_blueprint(screening_bp)

app.register_blueprint(auth_bp)

app.register_blueprint(dashboard_bp)

app.register_blueprint(chatbot_bp)

# Run Server
if __name__ == '__main__':

    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )