from flask_restful import Resource, reqparse
from models import UserModel, TrashbinImageModel
from flask_jwt_extended import jwt_required, get_jwt_identity

class Trashbin(Resource):
    def get(self):
        return TrashbinImageModel.return_all()

    @jwt_required
    def post(self):
        current_user = UserModel.find_by_username(get_jwt_identity())
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
                userId = current_user.id,
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
