from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

db = SQLAlchemy(app)

class User(db.Model):
    date = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.String(100), nullable=False)


@app.route('/users', methods=['POST'])
def add_user():
    data = request.json
    new_user = User(name=data['name'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"id": new_user.date, "name": new_user.amount})

# @app.route('/users', methods=['GET'])
# def get_users():
#     users = User.query.all()
#     return jsonify([{"id": u.id, "name": u.name} for u in users])

# if __name__ == '__main__':
#     app.run(debug=True)