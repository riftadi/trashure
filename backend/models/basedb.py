from run import db

class BaseDBClass:
    """
        This class contains shared common methods
        in the model classes.
    """

    def add_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id = id).first()
