from flask_restful import Resource, reqparse
from models import UserModel, GameModel, AreaModel
from flask_jwt_extended import jwt_required, get_jwt_identity

class GameStart(Resource):
    @jwt_required
    def get(self):
        current_user = UserModel.find_by_username(get_jwt_identity())
        current_area = self.get_game_area()

        new_game = GameModel(
            userId = current_user.id,
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
                "latitudeEnd": current_area.latitudeEnd,
                "startingPointLongitude": current_area.startingPointLongitude,
                "startingPointLatitude": current_area.startingPointLatitude,
                "createdOn" : x.createdOn,
                "updatedOn" : x.updatedOn
            }
        }

    def get_game_area(self):
        return AreaModel.find_by_id(1)


class GameEnd(Resource):
    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("id", type=int, help = "This field cannot be blank", required = True)
        parser.add_argument("score", type=int, help = "This field cannot be blank", required = True)
        
        data = parser.parse_args()

        current_game = GameModel.find_by_id(data["id"])
        current_game.update_score(data["score"])

        return {"msg": "score updated"}


class Highscores(Resource):
    def get(self):
        return UserModel.get_highscore()

