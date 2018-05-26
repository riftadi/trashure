from run import db
from models.basedb import BaseDBClass

class AreaModel(db.Model, BaseDBClass):
    __tablename__ = "areas"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique = True)
    longitudeStart = db.Column(db.Float)
    latitudeStart = db.Column(db.Float)
    longitudeEnd = db.Column(db.Float)
    latitudeEnd = db.Column(db.Float)

    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                "id" : x.id,
                "name": x.name,
                "longitudeStart": x.longitudeStart,
                "latitudeStart" : x.latitudeStart,
                "longitudeEnd": x.longitudeEnd,
                "latitudeEnd" : x.latitudeEnd
            }
        return {"areas": list(map(lambda x: to_json(x), AreaModel.query.all()))}
