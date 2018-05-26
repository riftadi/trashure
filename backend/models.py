from run import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy import desc

class BaseDBClass:
    def add_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id = id).first()


class UserModel(db.Model, BaseDBClass):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(120), nullable = False)
    score = db.Column(db.BigInteger, nullable = False)
    
    def add_score(self, score):
        self.score += score
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username = username).first()
    
    @classmethod
    def get_highscore(cls):
        user_list = UserModel.query.order_by(desc(UserModel.score)).all()

        hs_list = []
        pc = 1

        for user in user_list:
            hs_list.append(
                    {
                        "position": pc,
                        "name": user.username,
                        "totalScore": user.score
                    }
                )
            pc += 1

        return {"Highscore": hs_list}

    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                "username": x.username,
                "password": x.password,
                "score" : x.user
            }
        return {"users": list(map(lambda x: to_json(x), UserModel.query.all()))}

    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {"message": "{} row(s) deleted".format(num_rows_deleted)}
        except:
            return {"message": "Something went wrong"}

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)
    
    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)

class RevokedTokenModel(db.Model, BaseDBClass):
    __tablename__ = "revoked_tokens"
    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(120))
    
    def add(self):
        db.session.add(self)
        db.session.commit()
    
    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti = jti).first()
        return bool(query)


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

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id = id).first()


class GameModel(db.Model, BaseDBClass):
    __tablename__ = "games"
    id = db.Column(db.Integer, primary_key = True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"),
        nullable=False)
    areaId = db.Column(db.Integer, db.ForeignKey("areas.id"),
        nullable=False)
    score = db.Column(db.BigInteger, nullable = False)
    isFinished = db.Column(db.Boolean)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def update_score(self, score):
        self.score = score
        self.isFinished = True

        # also update the player score
        UserModel.find_by_id(self.userId).add_score(score)

        db.session.commit()


class TrashbinModel(db.Model, BaseDBClass):
    __tablename__ = "trashbins"
    id = db.Column(db.Integer, primary_key = True)
    isVerified = db.Column(db.Boolean)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)


class TrashbinImageModel(db.Model, BaseDBClass):
    __tablename__ = "trashbin_images"
    id = db.Column(db.Integer, primary_key = True)
    trashbinId = db.Column(db.Integer, db.ForeignKey("trashbins.id"))
    userId = db.Column(db.Integer, db.ForeignKey("users.id"),
        nullable=False)
    isVerified = db.Column(db.Boolean)
    pano = db.Column(db.String(32))
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    fov = db.Column(db.Integer)
    heading = db.Column(db.Integer)
    pitch = db.Column(db.Integer)
    isAnnotated = db.Column(db.Boolean)
    topLeftPixel = db.Column(db.Integer)
    bottomRightPixel = db.Column(db.Integer)

