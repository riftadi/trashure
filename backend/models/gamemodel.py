from run import db
from models.basedb import BaseDBClass

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
