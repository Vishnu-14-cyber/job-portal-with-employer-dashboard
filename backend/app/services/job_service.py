from sqlalchemy.orm import Session
from app.models.job import Job
def create_job(db: Session, job):
    new_job = Job(
        title=job.title,
        company_name=job.company_name,
        location=job.location,
        salary=job.salary,
        experience=job.experience,
        job_type=job.job_type,
        description=job.description,
        skills=job.skills
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return {"message": "Job Posted Successfully"}
def get_jobs(db: Session):
    return db.query(Job).all()