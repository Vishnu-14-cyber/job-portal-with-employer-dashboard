from sqlalchemy.orm import Session
from app.models.application import Application
def apply_to_job(db: Session, job_id: int, application):
    new_application = Application(
        job_id=job_id,
        applicant_name=application.applicant_name,
        email=application.email,
        phone=application.phone
    )
    db.add(new_application)
    db.commit()
    db.refresh(new_application)
    return {"message": "Job Applied Successfully"}
def get_applications(db: Session):
    return db.query(Application).all()