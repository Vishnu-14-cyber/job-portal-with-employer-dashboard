from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.database import Base
class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    applicant_name = Column(String)
    email = Column(String)
    phone = Column(String)
