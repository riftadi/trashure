from run import app, db
from flask import jsonify
from models import UserModel, RevokedTokenModel, AreaModel, GameModel

@app.route('/')
def index():
    return jsonify({'message': 'Hello world!'})

