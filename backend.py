from flask import Flask, request, jsonify
import psycopg2
import os

app = Flask(__name__)

DATABASE_URL = os.environ.get("DATABASE_URL")


conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

@app.route("/add", methods=["POST"])
def add_user():
    data = request.get_json()

    money = data["Money"]
    

    cursor.execute(
        "INSERT INTO users (name, age) VALUES (%s, %s);",
        (money)
    )
    conn.commit()

    return jsonify({"message": "Saved to database!"})


app.run(host="0.0.0.0", port=10000)


