from flask import Flask
import os

backend = Flask(__name__)
backend.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")


