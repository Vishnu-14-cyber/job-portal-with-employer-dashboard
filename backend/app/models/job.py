from sqlalchemy import Column, Integer, String
from app.database.database import Base
class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    company_name = Column(String)
    location = Column(String)
    salary = Column(String)
    experience = Column(String)
    job_type = Column(String)
    description = Column(String)
    skills = Column(String)