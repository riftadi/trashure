from run import db
from models.basedb import BaseDBClass

class RevokedTokenModel(db.Model, BaseDBClass):
    __tablename__ = "revoked_tokens"
    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(120))
    
    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti = jti).first()
        return bool(query)
