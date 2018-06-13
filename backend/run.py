from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

import os

app = Flask(__name__)
api = Api(app)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'nZNzIXejCcaunKTbgmtffboST9SrGhqF'

db = SQLAlchemy(app)

app.config['JWT_SECRET_KEY'] = 'iSCOrZ86aMP04xWK2ehCNiLFIYC9tgw1'
jwt = JWTManager(app)

app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

import views
from models import *
from resources import *

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_jti_blacklisted(jti)

db.create_all()
db.session.commit()

api.add_resource(UserRegistration, '/api/registration')
api.add_resource(UserLogin, '/api/login')
api.add_resource(UserLogoutAccess, '/api/logout/access')
api.add_resource(UserLogoutRefresh, '/api/logout/refresh')
api.add_resource(TokenRefresh, '/api/token/refresh')
api.add_resource(Highscores, '/api/scores/highscores')
api.add_resource(GameStart, '/api/game/start')
api.add_resource(GameEnd, '/api/game/end')
api.add_resource(Trashbin, '/api/game/trashbin', '/api/scores/trophies')
api.add_resource(MapAreas, '/api/game/area')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    #port = int(os.environ.get("PORT", 5112))
    app.run(host='0.0.0.0', port=port, debug=True)
