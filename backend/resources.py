from flask import jsonify
from flask_restful import Resource, reqparse
from models import *
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

class UserRegistration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", help = "This field cannot be blank", required = True)
        parser.add_argument("password", help = "This field cannot be blank", required = True)

        data = parser.parse_args()
        
        if UserModel.find_by_username(data["username"]):
            return {"message": "User {} already exists".format(data["username"])}
        
        new_user = UserModel(
            username = data["username"],
            password = UserModel.generate_hash(data["password"]),
            score = 0
        )
        
        try:
            new_user.add_to_db()
            access_token = create_access_token(identity = data["username"])
            refresh_token = create_refresh_token(identity = data["username"])
            return {
                "message": "User {} was created".format(data["username"]),
                "access_token": access_token,
                "refresh_token": refresh_token
                }
        except:
            return {"message": "Something went wrong"}, 500


class UserLogin(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", help = "This field cannot be blank", required = True)
        parser.add_argument("password", help = "This field cannot be blank", required = True)
        
        data = parser.parse_args()
        current_user = UserModel.find_by_username(data["username"])

        if not current_user:
            return {"message": "User {} doesn\"t exist".format(data["username"])}
        
        if UserModel.verify_hash(data["password"], current_user.password):
            access_token = create_access_token(identity = data["username"])
            refresh_token = create_refresh_token(identity = data["username"])
            return {
                "message": "Logged in as {}".format(current_user.username),
                "access_token": access_token,
                "refresh_token": refresh_token
                }
        else:
            return {"message": "Wrong credentials"}


class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()["jti"]
        try:
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.add()
            return {"message": "Access token has been revoked"}
        except:
            return {"message": "Something went wrong"}, 500


class UserLogoutRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        jti = get_raw_jwt()["jti"]
        try:
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.add()
            return {"message": "Refresh token has been revoked"}
        except:
            return {"message": "Something went wrong"}, 500


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity = current_user)
        return {"access_token": access_token}


class AllUsers(Resource):
    def get(self):
        return UserModel.return_all()
    
    def delete(self):
        return UserModel.delete_all()


class GameStart(Resource):
    # @jwt_required
    def get(self):
        # current_user = UserModel.find_by_username(get_jwt_identity())
        current_area = self.get_game_area()

        new_game = GameModel(
            # userId = current_user.id,
            userId = 1,
            areaId = current_area.id,
            score = 0,
            isFinished = False
        )

        new_game.add_to_db()

        return {
            "id": new_game.id,
            "gamemode": 0,
            "area" : {
                "longitudeStart": current_area.longitudeStart,
                "latitudeStart": current_area.latitudeStart,
                "longitudeEnd": current_area.longitudeEnd,
                "latitudeEnd": current_area.latitudeEnd
            }
        }

    def get_game_area(self):
        # temporary, we only have one area anyway
        return AreaModel.find_by_id(1)


class GameEnd(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("id", type=int, help = "This field cannot be blank", required = True)
        parser.add_argument("score", type=int, help = "This field cannot be blank", required = True)
        
        data = parser.parse_args()

        current_game = GameModel.find_by_id(data["id"])
        current_game.update_score(data["score"])

        return {"msg": "score updated"}


class Trashbin(Resource):
    def get(self):
        return TrashbinImageModel.return_all()

    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument("pano", help = "This field cannot be blank", required = True)
        parser.add_argument("longitude", type=float, help = "This field cannot be blank", required = True)
        parser.add_argument("latitude", type=float, help = "This field cannot be blank", required = True)
        parser.add_argument("fov", type=int, help = "This field cannot be blank", required = True)
        parser.add_argument("heading", type=int, help = "This field cannot be blank", required = True)
        parser.add_argument("pitch", type=int, help = "This field cannot be blank", required = True)
        
        data = parser.parse_args()

        is_bin_discovered = self.is_trashbin_already_discovered(data["longitude"], data["latitude"])

        # add image to trashbin_images table
        new_image = TrashbinImageModel(
                # userId = current_user.id,
                userId = 1,
                isVerified = is_bin_discovered,
                pano = data["pano"],
                longitude = data["longitude"],
                latitude = data["latitude"],
                fov = data["fov"],
                heading = data["heading"],
                pitch = data["pitch"],
                isAnnotated = False
            )

        new_image.add_to_db()

        return {"verified": is_bin_discovered}

    def is_trashbin_already_discovered(self, longitude, latitude):
        # check in trashdb if trashbin with similar position already exist
        return False


class Highscores(Resource):
    def get(self):
        return UserModel.get_highscore()


class MapAreas(Resource):
    def get(self):
        return AreaModel.return_all()

    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument("name", help = "This field cannot be blank", required = True)
        parser.add_argument("longitudeStart", type=float, help = "This field cannot be blank", required = True)
        parser.add_argument("latitudeStart", type=float, help = "This field cannot be blank", required = True)
        parser.add_argument("longitudeEnd", type=float, help = "This field cannot be blank", required = True)
        parser.add_argument("latitudeEnd", type=float, help = "This field cannot be blank", required = True)

        data = parser.parse_args()

        new_area = AreaModel(
                name = data["name"],
                longitudeStart = data["longitudeStart"],
                latitudeStart = data["latitudeStart"],
                longitudeEnd = data["longitudeEnd"],
                latitudeEnd = data["latitudeEnd"]
            )
        new_area.add_to_db()

        return {"msg": "Area added"}


