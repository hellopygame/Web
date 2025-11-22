from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from sqlalchemy.dialects.postgresql import JSON

backend = Flask(__name__)
CORS(backend) 


backend.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
backend.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(backend)


class MoneyData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(JSON)  

with backend.backend_context():
    db.create_all()


@backend.route("/", methods=["POST"])
def receive_money():
    data = request.get_json()
    itemarray = data.get("Money")

    if itemarray is None:
        return jsonify({"error": "No Money field sent"}), 400

    entry = MoneyData(value=itemarray)
    db.session.add(entry)
    db.session.commit()

    return jsonify({"message": "Data received!"})


@backend.route("/all", methods=["GET"])
def get_all():
    entries = MoneyData.query.all()
    return jsonify([e.value for e in entries])




