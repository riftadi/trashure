from flask_restful import Resource, reqparse
from models import AreaModel

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
        parser.add_argument("startingPointLongitude", type=float, help = "This field cannot be blank", required = True)
        parser.add_argument("startingPointLatitude", type=float, help = "This field cannot be blank", required = True)

        data = parser.parse_args()

        new_area = AreaModel(
                name = data["name"],
                longitudeStart = data["longitudeStart"],
                latitudeStart = data["latitudeStart"],
                longitudeEnd = data["longitudeEnd"],
                latitudeEnd = data["latitudeEnd"],
                startingPointLongitude = data["startingPointLongitude"],
                startingPointLatitude = data["startingPointLatitude"]
            )
        new_area.add_to_db()

        return {"msg": "Area added"}

