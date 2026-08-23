from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.schemas.job import JobCreate
from app.schemas.application import ApplicationCreate
from app.services.job_service import create_job, get_jobs
from app.services.application_service import apply_to_job
router = APIRouter()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.post("/create")
def add_job(job: JobCreate, db: Session = Depends(get_db)):
    return create_job(db, job)
@router.get("/")
def view_jobs(db: Session = Depends(get_db)):
    return get_jobs(db)
@router.post("/apply/{job_id}")
def apply_for_job(job_id: int, application: ApplicationCreate, db: Session = Depends(get_db)):
    return apply_to_job(db, job_id, application)