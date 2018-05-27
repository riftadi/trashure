from run import db
from models.basedb import BaseDBClass
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy import desc

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
